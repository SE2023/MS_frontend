<template>
  <div>
    <div
      style="
        width: 98%;
        background-color: white;
        margin-left: 1%;
        margin-top: 15px;
        padding: 15px 10px 0 30px;
        display: flex;
      "
    >
      <Form layout="inline" autocomplete="off" class="bar-form">
        <FormItem label="Facility" name="facility" style="margin-bottom: 15px">
          <Input v-model:value="formState.facility" placeholder="Please input" />
        </FormItem>
        <FormItem label="Date" name="date" style="margin-bottom: 15px">
          <DatePicker v-model:value="formState.date" />
        </FormItem>
      </Form>
      <div class="bar-buttons">
        <Button @click="resetFilterOptions">Reset</Button>
        <Button type="primary" @click="filter">Filter</Button>
      </div>
    </div>
    <div
      style="
        width: 98%;
        background-color: white;
        margin-left: 1%;
        margin-top: 15px;
        padding: 15px 5px 15px 5px;
        display: flex;
      "
    >
      <Table
        :columns="columns"
        :data-source="dataToShow"
        :pagination="{ pageSize: 50 }"
        :scroll="{ x: 1600, y: 480 }"
        bordered
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'status'">
            <Tag v-if="text === 'open'" color="success">
              {{ text }}
            </Tag>
            <Tag v-else color="error">
              {{ text }}
            </Tag>
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <Popconfirm
              title="Sure to delete?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteActivityAction(record)"
            >
              <Tooltip @click="deleteActivity">
                <template #title>
                  <span>Delete</span>
                </template>
                <DeleteOutlined style="color: rgb(221, 118, 115)" class="operation-buttons" />
              </Tooltip>
            </Popconfirm>
          </template>
        </template>
        <template #title>
          <div style="display: flex">
            <span
              style="
                margin-right: 10px;
                font-weight: bold;
                font-size: 15px;
                position: relative;
                top: 4px;
              "
              >Activities</span
            >
            <Button type="primary" style="margin-left: auto" @click="addActivity">Add</Button>
          </div>
        </template>
      </Table>
    </div>

    <!--  add an activity  -->
    <BasicModal
      title="Add An Activity"
      v-model:visible="addActivityModalVisible"
      @ok="addActivityAction"
    >
      <Form :model="formActivity" :label-col="{ span: 5 }">
        <FormItem label="Activity" name="name" :rules="[{ required: true }]">
          <Input v-model:value="formActivity.name" />
        </FormItem>
        <FormItem label="Facility" name="facility" :rules="[{ required: true }]">
          <Select v-model:value="formActivity.facility" :options="facilityList" />
        </FormItem>
        <FormItem label="Price" name="price" :rules="[{ required: true }]">
          <InputNumber
            v-model:value="formActivity.price"
            prefix="¥"
            defaultValue="10"
            min="1"
            max="100"
            :precision="1"
            :step="0.1"
            style="width: 100%"
          />
        </FormItem>
        <FormItem label="Status" name="status" :rules="[{ required: true }]">
          <Select v-model:value="formActivity.status" placeholder="Please select">
            <Select.Option value="open">open</Select.Option>
            <Select.Option value="close">close</Select.Option>
          </Select>
        </FormItem>
        <FormItem label="Capacity" name="capacity" :rules="[{ required: true }]">
          <InputNumber
            v-model:value="formActivity.capacity"
            defaultValue="10"
            min="2"
            max="50"
            :precision="0"
            :step="1"
            style="width: 100%"
          />
        </FormItem>
        <FormItem label="Date" name="date" :rules="[{ required: true }]">
          <DatePicker v-model:value="formActivity.date" />
        </FormItem>
        <FormItem label="Time" name="time" :rules="[{ required: true }]">
          <RangePicker v-model:value="formActivity.time" picker="time" />
        </FormItem>
        <FormItem label="Note" name="note">
          <Textarea v-model:value="formActivity.note" />
        </FormItem>
      </Form>
    </BasicModal>
  </div>
</template>

<script lang="ts" setup>
  import {
    Button,
    Table,
    Tag,
    Form,
    FormItem,
    Input,
    InputNumber,
    DatePicker,
    notification,
    Select,
    RangePicker,
    Textarea,
    Tooltip,
    Popconfirm,
  } from 'ant-design-vue'
  import { DeleteOutlined } from '@ant-design/icons-vue'
  import { onMounted, reactive, ref } from 'vue'

  import {
    getActivityListWithTimeApi,
    createTimeUnityApi,
    createActivityApi,
  } from '/@/api/sys/activity'
  import { getFacilityListApi } from '/@/api/sys/facility'
  import { timestampToTime, timestampToTime2 } from '/@/utils/dateUtil'
  import { permissionVerify } from '/@/utils/auth'

  import { useI18n } from '/@/hooks/web/useI18n'
  import BasicModal from '/@/components/Modal/src/BasicModal.vue'
  import { ActivityModel } from '/@/api/sys/model/activityModel'
  const { t } = useI18n()

  interface FormState {
    facility: string
    date: string
  }

  const formState = reactive<FormState>({
    facility: '',
    date: '',
  })

  const columns = [
    {
      title: 'Activity',
      dataIndex: 'activity',
      align: 'center',
    },
    {
      title: 'Facility Name',
      dataIndex: 'facilityName',
    },
    {
      title: 'price',
      dataIndex: 'price',
      align: 'center',
    },
    {
      title: 'status',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'peopleAmount',
      dataIndex: 'peopleAmount',
      align: 'center',
    },
    {
      title: 'capacity',
      dataIndex: 'capacity',
      align: 'center',
    },
    {
      title: 'date',
      dataIndex: 'date',
      align: 'center',
    },
    {
      title: 'startTime',
      dataIndex: 'startTime',
      align: 'center',
    },
    {
      title: 'endTime',
      dataIndex: 'endTime',
      align: 'center',
    },
    {
      title: 'note',
      dataIndex: 'note',
      align: 'center',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      align: 'center',
    },
  ]

  const addActivityModalVisible = ref(false)

  const facilityList: any = ref([])

  const formActivity = reactive({
    name: '',
    facility: '',
    price: 1,
    status: '',
    capacity: 2,
    date: '',
    time: [],
    note: '',
  })

  const data: any = ref([])

  const dataToShow: any = ref([])

  const getActivityList = async () => {
    // clear data and dataToShow
    data.value.splice(0, data.value.length)
    dataToShow.value.splice(0, dataToShow.value.length)
    const activityList = await getActivityListWithTimeApi()
    for (let i = 0; i < activityList.length; i++) {
      // 判断date是否为今天之后, date为string类型'yyyy-mm-dd', 需要转换为Date类型
      const date = new Date(
        activityList[i].date.split('-')[0],
        activityList[i].date.split('-')[1] - 1,
        activityList[i].date.split('-')[2],
      )
      const today = new Date()
      if (date < today) {
        continue
      }
      data.value.push({
        activity: activityList[i].name,
        facilityName: activityList[i].facility,
        facilityType: activityList[i].facilityType,
        price: activityList[i].price,
        status: activityList[i].status,
        peopleAmount: activityList[i].peopleAmount,
        capacity: activityList[i].capacity,
        date: activityList[i].date,
        startTime: activityList[i].startTime,
        endTime: activityList[i].endTime,
        note: activityList[i].note,
      })
    }
    for (let i = 0; i < data.value.length; i++) {
      dataToShow.value.push(data.value[i])
    }
  }

  const getFacilityList = async () => {
    const res = await getFacilityListApi()
    for (let i = 0; i < res.length; i++) {
      facilityList.value.push({
        label: res[i].name,
        value: res[i].id,
      })
    }
    console.log(facilityList.value)
  }

  onMounted(async () => {
    await getActivityList()
    await getFacilityList()
  })

  // add activity
  const addActivity = async () => {
    if (!(await permissionVerify())) {
      notification.error({
        message: t('sys.api.errorTip'),
        description: t('sys.api.permissionError'),
      })
      return
    }
    addActivityModalVisible.value = true
  }

  const addActivityAction = async () => {
    const timeUnityParams = {
      date: timestampToTime(formActivity.date),
      startTime: timestampToTime2(formActivity.time[0]).substring(0, 5),
      endTime: timestampToTime2(formActivity.time[1]).substring(0, 5),
    }
    const timeUnityId = await createTimeUnityApi(timeUnityParams)
    const activityParams: ActivityModel = {
      name: formActivity.name,
      facilityId: parseInt(formActivity.facility),
      price: '¥' + formActivity.price.toString(),
      note: formActivity.note,
      userAmount: 0,
      status: formActivity.status,
      capacity: formActivity.capacity,
    }
    const res = await createActivityApi(timeUnityId, activityParams)
    if (res) {
      notification.success({
        message: 'Success Tip',
        description: 'Add activity successfully!',
      })
      addActivityModalVisible.value = false
      await getActivityList()
    } else {
      notification.error({
        message: 'Error Tip',
        description: 'Add activity failed!',
      })
    }
  }

  // edit activity
  // const editActivity = async () => {
  //   if (!(await permissionVerify())) {
  //     notification.error({
  //       message: t('sys.api.errorTip'),
  //       description: t('sys.api.permissionError'),
  //     })
  //     return
  //   }
  // }

  // delete activity
  const deleteActivity = async () => {
    if (!(await permissionVerify())) {
      notification.error({
        message: t('sys.api.errorTip'),
        description: t('sys.api.permissionError'),
      })
      return
    }
  }

  const deleteActivityAction = async (activity: any) => {
    console.log(activity)
  }

  const resetFilterOptions = async () => {
    formState.facility = ''
    formState.date = ''
    await getActivityList()
  }

  const filter = () => {
    dataToShow.value.splice(0, dataToShow.value.length)
    for (let i = 0; i < data.value.length; i++) {
      dataToShow.value.push(data.value[i])
    }
    let dateTmp: Date
    const date = timestampToTime(formState.date)
    for (let i = 0; i < dataToShow.value.length; i++) {
      if (formState.facility !== '') {
        console.log(formState.facility)
        console.log(dataToShow.value[i].facilityName)
        if (!dataToShow.value[i].facilityName.includes(formState.facility)) {
          dataToShow.value.splice(i, 1)
          i--
          continue
        }
      }
      if (formState.date !== '') {
        dateTmp = new Date(
          dataToShow.value[i].date.split('-')[0],
          dataToShow.value[i].date.split('-')[1] - 1,
          dataToShow.value[i].date.split('-')[2],
        )
        if (timestampToTime(dateTmp) !== date) {
          dataToShow.value.splice(i, 1)
          i--
        }
      }
    }
  }
</script>

<style scoped>
  .bar-form > FormItem {
    margin-right: 20px;
    margin-bottom: 15px;
  }
  .bar-buttons {
    margin-left: auto;
    width: 200px;
  }
  .bar-buttons > Button {
    width: 80px;
    margin-right: 15px;
    margin-bottom: 15px;
  }
  .operation-buttons {
    cursor: pointer;
  }
</style>
