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
        <FormItem label="Facility" name="facility" style="margin-bottom: 15px">
          <Input v-model:value="formState.facility" placeholder="Please input" />
        </FormItem>
        <FormItem label="Activity" name="activity" style="margin-bottom: 15px">
          <Input v-model:value="formState.activity" placeholder="Please input" />
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
      <Table style="width: 100%" :columns="columns" :data-source="dataToShow" bordered>
        <template #bodyCell="{ column, text, record }">
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
            <Tooltip @click="toPrint(record)">
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
              >Unused</span
            >
          </div>
        </template>
      </Table>
    </div>

    <!--  the receipt to be printed  -->
    <BasicModal
      title="Receipt"
      width="100%"
      v-model:visible="visible"
      okText="Print"
      @ok="toPrintAction"
    >
      <div id="print-content">
        <Descriptions title="Receipt Information">
          <DescriptionsItem label="Name">{{ dataToBePrinted.name }}</DescriptionsItem>
          <DescriptionsItem label="Email">{{ dataToBePrinted.email }}</DescriptionsItem>
          <DescriptionsItem label="Facility">{{ dataToBePrinted.facility }}</DescriptionsItem>
          <DescriptionsItem label="Activity">{{ dataToBePrinted.activity }}</DescriptionsItem>
          <DescriptionsItem label="Activity time">{{
            dataToBePrinted.activityTime
          }}</DescriptionsItem>
          <DescriptionsItem label="Paid">{{ dataToBePrinted.paid }} </DescriptionsItem>
          <DescriptionsItem label="Order time">{{ dataToBePrinted.orderTime }}</DescriptionsItem>
          <DescriptionsItem label="Remark">{{ dataToBePrinted.remark }}</DescriptionsItem>
        </Descriptions>
        <img alt="logo" src="../../../assets/images/logo2.png" style="width: 110px; float: right" />
      </div>
    </BasicModal>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue'
  import {
    Form,
    FormItem,
    Input,
    Button,
    Table,
    Tooltip,
    Tag,
    Descriptions,
    DescriptionsItem,
  } from 'ant-design-vue'
  import { PrinterOutlined } from '@ant-design/icons-vue'

  import { getBookingListApi } from '/@/api/sys/booking'
  import printJS from 'print-js'
  import BasicModal from '/@/components/Modal/src/BasicModal.vue'

  interface FormState {
    name: string
    email: string
    facility: string
    activity: string
  }
  const formState = reactive<FormState>({
    name: '',
    email: '',
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
      title: 'Email',
      dataIndex: 'email',
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
      title: 'Activity time',
      dataIndex: 'activityTime',
      align: 'center',
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      align: 'center',
    },
    {
      title: 'Order time',
      dataIndex: 'orderTime',
      align: 'center',
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      align: 'center',
    },
    {
      title: 'Operation',
      key: 'operation',
      dataIndex: 'operation',
      align: 'center',
    },
  ]

  const visible = ref(false)

  const data: any = ref([])

  const dataToShow: any = ref([])

  const dataToBePrinted: any = ref({})

  const getBookingList = async () => {
    const res = JSON.parse(await getBookingListApi())
    for (let i = 0; i < res.orders.length; i++) {
      if (res.orders[i].status === 'used') {
        data.value.push({
          key: res.orders[i].id,
          name: res.users[i].username,
          email: res.users[i].email,
          facility: res.facilities[i].name,
          activity: res.activities[i].name,
          activityTime:
            res.timeUnities[i].date +
            ' ' +
            res.timeUnities[i].startTime +
            '-' +
            res.timeUnities[i].endTime,
          paid: res.orders[i].payMoney,
          orderTime: res.orders[i].time,
          remark: res.orders[i].remark,
        })
      }
    }
    dataToShow.value = data.value
  }

  onMounted(async () => {
    await getBookingList()
  })

  const toPrint = (record: any) => {
    dataToBePrinted.value = {
      name: record.name,
      email: record.email,
      facility: record.facility,
      activity: record.activity,
      activityTime: record.activityTime,
      paid: record.paid,
      orderTime: record.orderTime,
      remark: record.remark,
    }
    visible.value = true
  }

  const toPrintAction = () => {
    printJS({
      printable: 'print-content',
      type: 'html',
      targetStyles: 'pdf',
      documentTitle: 'Receipt',
      scanStyles: true,
      headerStyle: 'font-size: 20px; font-weight: bold; text-align: center;',
    })
  }

  const toFilter = async () => {
    dataToShow.value.splice(0, dataToShow.value.length)
    data.value.splice(0, data.value.length)
    await getBookingList()
    for (let i = 0; i < dataToShow.value.length; i++) {
      if (formState.name !== '') {
        if (!dataToShow.value[i].name.includes(formState.name)) {
          dataToShow.value.splice(i, 1)
          i--
          continue
        }
      }
      if (formState.email !== '') {
        if (!dataToShow.value[i].email.includes(formState.email)) {
          dataToShow.value.splice(i, 1)
          i--
          continue
        }
      }
      if (formState.facility !== '') {
        if (!dataToShow.value[i].facility.includes(formState.facility)) {
          dataToShow.value.splice(i, 1)
          i--
          continue
        }
      }
      if (formState.activity !== '') {
        if (!dataToShow.value[i].activity.includes(formState.activity)) {
          dataToShow.value.splice(i, 1)
          i--
        }
      }
    }
  }

  const toReset = async () => {
    formState.name = ''
    formState.email = ''
    formState.facility = ''
    formState.activity = ''
    dataToShow.value.splice(0, dataToShow.value.length)
    data.value.splice(0, data.value.length)
    await getBookingList()
  }
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
