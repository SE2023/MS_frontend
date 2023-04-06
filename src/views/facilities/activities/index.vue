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
      >
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'status'">
            <Tag v-if="text === 'open'" color="success">
              {{ text }}
            </Tag>
            <Tag v-else color="error">
              {{ text }}
            </Tag>
          </template>
        </template>
      </Table>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Button, Table, Tag, Form, FormItem, Input, DatePicker } from 'ant-design-vue'
  import { onMounted, reactive, ref } from 'vue'

  import { getActivityListWithTimeApi } from '/@/api/sys/activity'
  import { timestampToTime } from "/@/utils/dateUtil";

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

  onMounted(async () => {
    await getActivityList()
  })

  // add activity
  // const addActivity = async () => {
  //   if (!(await permissionVerify())) {
  //     notification.error({
  //       message: t('sys.api.errorTip'),
  //       description: t('sys.api.permissionError'),
  //     })
  //     return
  //   }
  // }

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
  // const deleteActivity = async () => {
  //   if (!(await permissionVerify())) {
  //     notification.error({
  //       message: t('sys.api.errorTip'),
  //       description: t('sys.api.permissionError'),
  //     })
  //     return
  //   }
  // }

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
        // console.log('-----')
        // console.log(
        //   dataToShow.value[i].date.split('-')[0] +
        //     ', ' +
        //     dataToShow.value[i].date.split('-')[1] +
        //     ', ' +
        //     dataToShow.value[i].date.split('-')[2],
        // )
        // console.log(dateTmp)
        // console.log(timestampToTime(dateTmp))
        // console.log(date)
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
