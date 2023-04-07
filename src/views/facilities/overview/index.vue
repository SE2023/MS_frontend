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
        <FormItem label="State" name="state">
          <Select v-model:value="formState.state" placeholder="Please select" style="width: 200px">
            <Select.Option value="open">open</Select.Option>
            <Select.Option value="close">close</Select.Option>
          </Select>
        </FormItem>
      </Form>
      <div class="bar-buttons">
        <Button @click="toReset">Reset</Button>
        <Button type="primary" @click="toFilter">Filter</Button>
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
      <Table style="width: 100%" :columns="columns" :data-source="data" bordered>
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'status'">
            <Tag v-if="text === 'open'" color="success">
              {{ text }}
            </Tag>
            <Tag v-else color="error">
              {{ text }}
            </Tag>
          </template>
          <template v-if="column.key === 'operation'">
            <Tooltip @click="editFacility(record)">
              <template #title>
                <span>Edit</span>
              </template>
              <FormOutlined style="color: rgb(49, 100, 185)" class="operation-buttons" />
            </Tooltip>
            <span
              style="
                margin-left: 10px;
                margin-right: 10px;
                position: relative;
                bottom: 2px;
                color: rgba(217, 217, 217, 0.5);
              "
              >|</span
            >
            <Popconfirm
              title="Sure to delete?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteFacilityAction(record.key)"
            >
              <Tooltip @click="deleteFacility">
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
              >Facilities</span
            >
            <Button type="primary" style="margin-left: auto" @click="addFacility">Add</Button>
          </div>
        </template>
      </Table>
    </div>

    <!-- Add a facility -->
    <BasicModal
      title="Add A Facility"
      v-model:visible="addFacilityModalVisible"
      @ok="addFacilityAction"
    >
      <Form :model="formFacility" :label-col="{ span: 5 }">
        <FormItem label="Type" name="type" :rules="[{ required: true }]">
          <Input v-model:value="formFacility.type" />
        </FormItem>
        <FormItem label="Name" name="name" :rules="[{ required: true }]">
          <Input v-model:value="formFacility.name" />
        </FormItem>
        <FormItem label="Status" name="status" :rules="[{ required: true }]">
          <Select v-model:value="formFacility.status" placeholder="Please select">
            <Select.Option value="open">open</Select.Option>
            <Select.Option value="close">close</Select.Option>
          </Select>
        </FormItem>
        <FormItem label="Contact" name="contact" :rules="[{ required: true }]">
          <Input v-model:value="formFacility.contact" />
        </FormItem>
        <FormItem label="Telephone" name="telephone" :rules="[{ required: true }]">
          <Input v-model:value="formFacility.telephone" />
        </FormItem>
      </Form>
    </BasicModal>

    <!-- Edit a facility -->
    <BasicModal
      title="Edit A Facility"
      v-model:visible="editFacilityModalVisible"
      @ok="editFacilityAction"
    >
      <Form :model="formFacility" :label-col="{ span: 5 }">
        <FormItem label="Type" name="type" :rules="[{ required: true }]">
          <Input v-model:value="formFacility.type" />
        </FormItem>
        <FormItem label="Name" name="name" :rules="[{ required: true }]">
          <Input v-model:value="formFacility.name" />
        </FormItem>
        <FormItem label="Status" name="status" :rules="[{ required: true }]">
          <Select v-model:value="formFacility.status" placeholder="Please select">
            <Select.Option value="open">open</Select.Option>
            <Select.Option value="close">close</Select.Option>
          </Select>
        </FormItem>
        <FormItem label="Contact" name="contact" :rules="[{ required: true }]">
          <Input v-model:value="formFacility.contact" />
        </FormItem>
        <FormItem label="Telephone" name="telephone" :rules="[{ required: true }]">
          <Input v-model:value="formFacility.telephone" />
        </FormItem>
      </Form>
    </BasicModal>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue'
  import {
    Form,
    FormItem,
    Select,
    Button,
    Table,
    Tag,
    Tooltip,
    Input,
    Popconfirm,
  } from 'ant-design-vue'
  import type { TableColumnType } from 'ant-design-vue'
  import { FormOutlined, DeleteOutlined } from '@ant-design/icons-vue'

  import { BasicModal } from '/@/components/Modal'

  import {
    getFacilityListApi,
    addFacilityApi,
    deleteFacilityApi,
    editFacilityApi,
  } from '/@/api/sys/facility'
  import { permissionVerify } from '/@/utils/auth/index'
  import { notification } from 'ant-design-vue/es'
  import { useI18n } from '/@/hooks/web/useI18n'
  const { t } = useI18n()

  interface FormState {
    state: any
  }

  interface formFacility {
    type: string
    name: string
    status: string
    contact: string
    telephone: string
    operation: string
  }

  const formState = reactive<FormState>({
    state: null,
  })

  const formFacility = reactive<formFacility>({
    type: '',
    name: '',
    status: 'open',
    contact: '',
    telephone: '',
    operation: '',
  })

  let addFacilityModalVisible = ref(false)
  let editFacilityModalVisible = ref(false)

  // the number of each type
  let typeNum: any = []

  // the id of the facility which is going to be edited
  let editFacilityId = 0

  // customCellRuleFunction
  const customCellRuleFunction = (typeNum: any) => {
    return (_, index: any) => {
      for (let i = 0; i < typeNum.length; i++) {
        if (index === typeNum[i].index) {
          return { rowSpan: typeNum[i].num }
        }
        for (let j = 0; j < typeNum[i].num - 1; j++) {
          if (index === typeNum[i].index + j + 1) {
            return { rowSpan: 0 }
          }
        }
      }
    }
  }

  const columns: TableColumnType[] = [
    {
      title: 'Type',
      dataIndex: 'type',
      align: 'center',
      customCell: customCellRuleFunction(typeNum),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      align: 'center',
    },
    {
      title: 'Telephone',
      dataIndex: 'telephone',
      align: 'center',
    },
    {
      title: 'Operation',
      key: 'operation',
      dataIndex: 'operation',
      align: 'center',
    },
  ]

  const data: any = ref([])

  // update the number of each type
  const updateTypeNum = () => {
    typeNum.splice(0, typeNum.length)
    let num = 1
    for (let i = 0; i < data.value.length; i++) {
      if (i === 0) {
        typeNum.push({
          index: i,
          num: num,
        })
      } else {
        if (data.value[i].type === data.value[i - 1].type) {
          num++
          typeNum[typeNum.length - 1].num = num
        } else {
          num = 1
          typeNum.push({
            index: i,
            num: num,
          })
        }
      }
    }
  }

  const initFacilityList = async () => {
    data.value.splice(0, data.value.length)
    await getFacilityListApi().then((res) => {
      for (let i = 0; i < res.length; i++) {
        data.value.push({
          key: res[i].id,
          type: res[i].type,
          name: res[i].name,
          status: res[i].status,
          contact: 'manager' + (i + 1).toString(),
          telephone: '1883301852' + i.toString(),
        })
      }
      // sort by type
      data.value.sort((a: any, b: any) => {
        return a.type.localeCompare(b.type)
      })
      // update the number of each type
      updateTypeNum()
    })
  }

  onMounted(async () => {
    await initFacilityList()
  })

  // add facility; open modal
  const addFacility = async () => {
    if (!(await permissionVerify())) {
      notification.error({
        message: t('sys.api.errorTip'),
        description: t('sys.api.permissionError'),
      })
      return
    }
    addFacilityModalVisible.value = true
  }

  // add facility; submit
  const addFacilityAction = async () => {
    await addFacilityApi(formFacility)
    await initFacilityList()
    addFacilityModalVisible.value = false
    // clear form
    formFacility.type = ''
    formFacility.name = ''
    formFacility.status = 'open'
    formFacility.contact = ''
    formFacility.telephone = ''
  }

  // edit facility
  const editFacility = async (facility: any) => {
    if (!(await permissionVerify())) {
      notification.error({
        message: t('sys.api.errorTip'),
        description: t('sys.api.permissionError'),
      })
      return
    }
    editFacilityId = facility.key
    formFacility.type = facility.type
    formFacility.name = facility.name
    formFacility.status = facility.status
    formFacility.contact = facility.contact
    formFacility.telephone = facility.telephone
    editFacilityModalVisible.value = true
  }

  // edit facility; submit
  const editFacilityAction = async () => {
    await editFacilityApi(editFacilityId, formFacility)
    await initFacilityList()
    editFacilityModalVisible.value = false
    // make sure editFacilityId is 0
    editFacilityId = 0
    // clear form
    formFacility.type = ''
    formFacility.name = ''
    formFacility.status = 'open'
    formFacility.contact = ''
    formFacility.telephone = ''
  }

  // delete facility
  const deleteFacility = async () => {
    if (!(await permissionVerify())) {
      notification.error({
        message: t('sys.api.errorTip'),
        description: t('sys.api.permissionError'),
      })
      return
    }
  }

  // delete facility; action
  const deleteFacilityAction = async (id: number) => {
    await deleteFacilityApi(id)
    await initFacilityList()
  }

  // reset form
  const toReset = async () => {
    formState.state = null
    await initFacilityList()
  }

  // filter
  const toFilter = async () => {
    await initFacilityList()
    console.log(data.value)
    // filter the data
    for (let i = 0; i < data.value.length; i++) {
      console.log('--')
      console.log(data.value[i].status)
      console.log(formState.state)
      if (data.value[i].status !== formState.state) {
        data.value.splice(i, 1)
        i--
      }
    }
    console.log(data.value)
    // update the number of each type
    updateTypeNum()
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
