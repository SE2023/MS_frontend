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
        <FormItem label="name" name="name" style="margin-bottom: 15px">
          <Input v-model:value="formState.name" placeholder="Please input" />
        </FormItem>
        <FormItem label="telephone" name="telephone" style="margin-bottom: 15px">
          <Input v-model:value="formState.telephone" placeholder="Please input" />
        </FormItem>
        <FormItem label="state" name="state" style="margin-bottom: 15px">
          <Select
            v-model:value="formState.joinDate"
            placeholder="Please select"
            style="width: 200px"
          >
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
          </Select>
        </FormItem>
        <FormItem label="facility" name="facility" style="margin-bottom: 15px">
          <Input v-model:value="formState.facility" placeholder="Please input" />
        </FormItem>
        <FormItem label="activity" name="activity" style="margin-bottom: 15px">
          <Input v-model:value="formState.activity" placeholder="Please input" />
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
          <template v-if="column.key === 'bookings'">
            <Button type="primary" size="small">Bookings</Button>
          </template>
          <template v-if="column.key === 'operation'">
            <Tooltip>
              <template #title>
                <span>Print</span>
              </template>
              <PrinterOutlined style="color: #569c30" class="operation-buttons" />
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
              >Used</span
            >
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  import { Form, FormItem, Input, Select, Button, Table, Tooltip, Tag } from 'ant-design-vue'
  import { PrinterOutlined } from '@ant-design/icons-vue'

  interface FormState {
    name: string
    telephone: string
    joinDate: any
    facility: string
    activity: string
  }
  const formState = reactive<FormState>({
    name: '',
    telephone: '',
    joinDate: null,
    facility: '',
    activity: '',
  })

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: 'Telephone',
      dataIndex: 'telephone',
      align: 'center',
    },
    {
      title: 'Facility',
      dataIndex: 'facility',
      align: 'center',
    },
    {
      title: 'Activity',
      dataIndex: 'activity',
      align: 'center',
    },
    {
      title: 'Booking time',
      dataIndex: 'bookingTime',
      align: 'center',
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      align: 'center',
    },
    {
      title: 'Operation',
      key: 'operation',
      dataIndex: 'operation',
      align: 'center',
    },
  ]

  const data = [
    {
      key: '1',
      name: 'San Zhang',
      telephone: '12345678901',
      facility: 'Swimming pool',
      activity: 'General use',
      bookingTime: '2021-01-01 12:00 - 2021-01-01 13:00',
      paid: '$10',
    },
    {
      key: '2',
      name: 'Si Li',
      telephone: '12345678901',
      facility: 'Swimming pool',
      activity: 'General use',
      bookingTime: '2021-01-01 12:00 - 2021-01-01 13:00',
      paid: '$10',
    },
    {
      key: '3',
      name: 'Wu Wang',
      telephone: '12345678901',
      facility: 'Swimming pool',
      activity: 'General use',
      bookingTime: '2021-01-01 12:00 - 2021-01-01 13:00',
      paid: '$10',
    },
  ]
</script>

<style scoped>
  .bar-form > FormItem {
    margin-right: 20px;
    margin-bottom: 15px;
  }
  .bar-buttons {
    margin-left: auto;
    width: 280px;
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
