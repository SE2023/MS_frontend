<template>
  <div
    style="
      width: 98%;
      background-color: white;
      margin-left: 1%;
      margin-top: 15px;
      padding: 15px 15px 15px 15px;
    "
  >
    <div style="display: flex">
      <span style="font-weight: bold; font-size: 16px; position: relative; top: 1px">Pictures</span>
      <div style="margin-left: auto">
        <Button type="primary" style="margin-left: 10px; width: 80px; margin-right: 15px"
          >Add</Button
        >
        <Button type="error" style="width: 80px">Clear All</Button>
      </div>
    </div>
    <Row :gutter="12" style="margin-bottom: 20px">
      <Col v-for="item in imageList" :key="item.key" :span="4">
        <div style="margin-top: 15px">
          <img :src="item.src" style="width: 100%" />
        </div>
      </Col>
    </Row>
    <div style="display: flex">
      <span style="font-weight: bold; font-size: 16px; position: relative; top: 1px">Texts</span>
      <div style="margin-left: auto">
        <Button type="primary" style="margin-left: 10px; width: 80px; margin-right: 15px"
          >Add</Button
        >
        <Button type="error" style="width: 80px">Clear All</Button>
      </div>
    </div>
    <Table style="width: 100%; margin-top: 10px" :columns="columns" :data-source="data" bordered>
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
              <span>Edit</span>
            </template>
            <FormOutlined style="color: #3e63b3" class="operation-buttons" />
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
    </Table>
  </div>
</template>

<script lang="ts" setup>
  import { Button, Row, Col, Table, Tag, Tooltip } from 'ant-design-vue'
  import { FormOutlined, DeleteOutlined } from '@ant-design/icons-vue'

  const imageList = [
    {
      key: 1,
      src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      key: 2,
      src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      key: 3,
      src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      key: 4,
      src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      key: 5,
      src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]

  const columns = [
    {
      title: 'Number',
      dataIndex: 'number',
      align: 'center',
    },
    {
      title: 'Content',
      dataIndex: 'content',
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
      number: '1',
      content: '国庆节，会员享受8折优惠，活动时间：2021-10-01至2021-10-07',
    },
    {
      key: '2',
      number: '2',
      content: '国庆节，会员享受8折优惠，活动时间：2021-10-01至2021-10-07',
    },
    {
      key: '3',
      number: '3',
      content: '国庆节，会员享受8折优惠，活动时间：2021-10-01至2021-10-07',
    },
  ]
</script>

<style scoped>
  .operation-buttons {
    cursor: pointer;
  }
</style>
