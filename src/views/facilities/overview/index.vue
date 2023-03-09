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
        <FormItem label="Name" name="name">
          <Input v-model:value="formState.name" placeholder="Please input" />
        </FormItem>
        <FormItem label="State" name="state">
          <Select v-model:value="formState.state" placeholder="Please select" style="width: 200px">
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
          </Select>
        </FormItem>
      </Form>
      <div class="bar-buttons">
        <Button>Reset</Button>
        <Button type="primary">Search</Button>
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
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'status'">
            <Tag v-if="text === 'open'" color="success">
              {{ text }}
            </Tag>
            <Tag v-else color="error">
              {{ text }}
            </Tag>
          </template>
          <template v-if="column.key === 'operation'">
            <Tooltip @click="editFacility">
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
            <Tooltip @click="deleteFacility">
              <template #title>
                <span>Delete</span>
              </template>
              <DeleteOutlined style="color: rgb(221, 118, 115)" class="operation-buttons" />
            </Tooltip>
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
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue'
  import { Form, FormItem, Input, Select, Button, Table, Tag, Tooltip } from 'ant-design-vue'
  import type { TableColumnType } from 'ant-design-vue'
  import { FormOutlined, DeleteOutlined } from '@ant-design/icons-vue'

  import { getFacilityList } from '/@/api/sys/facility'
  import { permissionVerify } from '/@/utils/auth/index'
  import { notification } from 'ant-design-vue/es'
  import { useI18n } from '/@/hooks/web/useI18n'
  const { t } = useI18n()

  interface FormState {
    name: string
    state: any
  }
  const formState = reactive<FormState>({
    name: '',
    state: null,
  })

  // the number of each type
  let typeNum: any = []

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
      title: 'Capacity',
      dataIndex: 'capacity',
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

  onMounted(async () => {
    await getFacilityList().then((res) => {
      for (let i = 0; i < res.length; i++) {
        data.value.push({
          key: res[i].id,
          type: res[i].type,
          name: res[i].name,
          status: res[i].status,
          capacity: res[i].capacity,
          contact: res[i].contact,
          telephone: res[i].telephone,
        })
      }
      // sort by type
      data.value.sort((a: any, b: any) => {
        return a.type.localeCompare(b.type)
      })
      // update the number of each type
      for (let i = 0; i < data.value.length; i++) {
        if (i === 0) {
          typeNum.push({
            type: data.value[i].type,
            num: 1,
            index: i,
          })
        } else {
          if (data.value[i].type === data.value[i - 1].type) {
            typeNum[typeNum.length - 1].num++
          } else {
            typeNum.push({
              type: data.value[i].type,
              num: 1,
              index: i,
            })
          }
        }
      }
    })
  })

  // add facility
  const addFacility = async () => {
    if (!(await permissionVerify())) {
      notification.error({
        message: t('sys.api.errorTip'),
        description: t('sys.api.permissionError'),
      })
      return
    }
    console.log('add facility')
  }

  // edit facility
  const editFacility = async () => {
    if (!(await permissionVerify())) {
      notification.error({
        message: t('sys.api.errorTip'),
        description: t('sys.api.permissionError'),
      })
      return
    }
    console.log('edit facility')
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
    console.log('delete facility')
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
