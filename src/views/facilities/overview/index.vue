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
        <FormItem label="name" name="name">
          <Input v-model:value="formState.name" placeholder="Please input" />
        </FormItem>
        <FormItem label="state" name="state">
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
            <Tooltip>
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
            <Tooltip>
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
            <Button type="primary" style="margin-left: auto">Add</Button>
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  import { Form, FormItem, Input, Select, Button, Table, Tag, Tooltip } from 'ant-design-vue'
  import type { TableColumnType } from 'ant-design-vue'
  import { FormOutlined, DeleteOutlined } from '@ant-design/icons-vue'

  interface FormState {
    name: string
    state: any
  }
  const formState = reactive<FormState>({
    name: '',
    state: null,
  })

  const columns: TableColumnType[] = [
    {
      title: 'Type',
      dataIndex: 'type',
      align: 'center',
      customCell: (_, index) => {
        if (index === 2) {
          return { rowSpan: 4 }
        }
        // These 3 are merged into above cell
        if (index === 3) {
          return { rowSpan: 0 }
        }
        if (index === 4) {
          return { rowSpan: 0 }
        }
        if (index === 5) {
          return { rowSpan: 0 }
        }
      },
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

  const data = [
    {
      key: '1',
      type: 'Swimming Pool',
      name: 'Swimming pool1',
      status: 'open',
      capacity: '30/32',
      contact: 'John',
      telephone: '12345678911',
    },
    {
      key: '2',
      type: 'Fitness room',
      name: 'Fitness room1',
      status: 'open',
      capacity: '12/25',
      contact: 'John',
      telephone: '12345678911',
    },
    {
      key: '3',
      type: 'Squash court',
      name: 'Squash court1',
      status: 'open',
      capacity: '4/4',
      contact: 'John',
      telephone: '12345678911',
    },
    {
      key: '4',
      type: 'Squash court',
      name: 'Squash court2',
      status: 'open',
      capacity: '4/4',
      contact: 'John',
      telephone: '12345678911',
    },
    {
      key: '5',
      type: 'Squash court',
      name: 'Squash court3',
      status: 'open',
      capacity: '4/4',
      contact: 'John',
      telephone: '12345678911',
    },
    {
      key: '6',
      type: 'Squash court',
      name: 'Squash court4',
      status: 'open',
      capacity: '4/4',
      contact: 'John',
      telephone: '12345678911',
    },
    {
      key: '7',
      type: 'Sports hall',
      name: 'Sports hall',
      status: 'close',
      capacity: '0/20',
      contact: 'John',
      telephone: '12345678911',
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
