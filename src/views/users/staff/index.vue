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
        <FormItem label="Name" name="name" style="margin-bottom: 15px">
          <Input v-model:value="formState.name" placeholder="Please input" />
        </FormItem>
        <FormItem label="Email" name="email" style="margin-bottom: 15px">
          <Input v-model:value="formState.email" placeholder="Please input" />
        </FormItem>
        <FormItem label="Join Date" name="joinDate" style="margin-bottom: 15px">
          <Select
            v-model:value="formState.joinDate"
            placeholder="Please select"
            style="width: 200px"
          >
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
              >Staff</span
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
  import { FormOutlined, DeleteOutlined } from '@ant-design/icons-vue'

  interface FormState {
    name: string
    email: string
    joinDate: any
  }
  const formState = reactive<FormState>({
    name: '',
    email: '',
    joinDate: null,
  })

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      align: 'center',
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
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
      email: '12345678901',
      password: 'abcdefg123',
      joinDate: '2021-01-01',
    },
    {
      key: '1',
      name: 'San Zhang',
      email: '12345678901',
      password: 'abcdefg123',
      joinDate: '2021-01-01',
    },
    {
      key: '1',
      name: 'San Zhang',
      email: '12345678901',
      password: 'abcdefg123',
      joinDate: '2021-01-01',
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
