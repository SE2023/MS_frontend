<template>
  <div>
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
            <Tooltip @click="editActivity">
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
            <Tooltip @click="deleteActivity">
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
              >Activities</span
            >
            <Button type="primary" style="margin-left: auto" @click="addActivity">Add</Button>
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Button, Table, Tag, Tooltip } from 'ant-design-vue'
  import type { TableColumnType } from 'ant-design-vue'
  import { FormOutlined, DeleteOutlined } from '@ant-design/icons-vue'
  import { permissionVerify } from '/@/utils/auth/index'
  import { notification } from 'ant-design-vue/es'
  import { useI18n } from '/@/hooks/web/useI18n'
  const { t } = useI18n()

  const columns: TableColumnType[] = [
    {
      title: 'Facility',
      dataIndex: 'facility',
      align: 'center',
      customCell: (_, index) => {
        if (index === 0) {
          return { rowSpan: 4 }
        }
        // These 3 are merged into above cell
        if (index === 1) {
          return { rowSpan: 0 }
        }
        if (index === 2) {
          return { rowSpan: 0 }
        }
        if (index === 3) {
          return { rowSpan: 0 }
        }
        if (index === 5) {
          return { rowSpan: 2 }
        }
        // The 1 is merged into above cell
        if (index === 6) {
          return { rowSpan: 0 }
        }
      },
    },
    {
      title: 'Activity',
      dataIndex: 'activity',
      align: 'center',
    },
    {
      title: 'Price',
      dataIndex: 'price',
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
      facility: 'Swimming pool',
      activity: 'General use',
      price: '$10/hour',
    },
    {
      key: '2',
      facility: 'Swimming pool',
      activity: 'Lane swimming',
      price: '$12/hour',
    },
    {
      key: '3',
      facility: 'Swimming pool',
      activity: 'Lessons',
      price: '$20/hour',
    },
    {
      key: '4',
      facility: 'Swimming pool',
      activity: 'Team events',
      price: '$15/hour',
    },
    {
      key: '5',
      facility: 'Fitness room',
      activity: 'General use',
      price: '$10/hour',
    },
    {
      key: '6',
      facility: 'Squash court',
      activity: '1-hour sessions',
      price: '$20/hour',
    },
    {
      key: '7',
      facility: 'Squash court',
      activity: 'Team events',
      price: '$15/hour',
    },
    {
      key: '8',
      facility: 'Sports hall',
      activity: '1-hour sessions',
      price: '$20/hour',
    },
  ]

  // add activity
  const addActivity = async () => {
    if (!(await permissionVerify())) {
      notification.error({
        message: t('sys.api.errorTip'),
        description: t('sys.api.permissionError'),
      })
      return
    }
  }

  // edit activity
  const editActivity = async () => {
    if (!(await permissionVerify())) {
      notification.error({
        message: t('sys.api.errorTip'),
        description: t('sys.api.permissionError'),
      })
      return
    }
  }

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
