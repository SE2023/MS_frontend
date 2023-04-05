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
          <DatePicker v-model:value="formState.joinDate" />
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
          <template v-if="column.key === 'operation'">
            <Tooltip @click="topUp(record)">
              <template #title>
                <span>Top up</span>
              </template>
              <MoneyCollectOutlined style="color: #569c30" class="operation-buttons" />
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
            <Tooltip @click="editUser(record)">
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
              @confirm="deleteUserAction(record)"
            >
              <Tooltip @click="deleteUser(record)">
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
              >Members</span
            >
          </div>
        </template>
      </Table>
    </div>

    <!--  top up  -->
    <BasicModal title="Top Up" v-model:visible="topUpModalVisible" @ok="topUpAction">
      <Form>
        <FormItem label="Amount" name="amount">
          <InputNumber
            v-model:value="topUpAmount"
            prefix="$"
            placeholder="Please input the amount."
            defaultValue="100"
            min="10"
            max="2000"
            style="width: 100%"
          />
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
    Input,
    DatePicker,
    Button,
    Table,
    Tooltip,
    Tag,
    Popconfirm,
    InputNumber,
  } from 'ant-design-vue'
  import { FormOutlined, DeleteOutlined, MoneyCollectOutlined } from '@ant-design/icons-vue'
  import { getUserListByRole, deleteUserApi, topUpApi } from '/@/api/sys/user'
  import { permissionVerifyUser } from '/@/utils/auth'
  import { notification } from 'ant-design-vue/es'

  import { timestampToTime } from '/@/utils/dateUtil'
  import BasicModal from '/@/components/Modal/src/BasicModal.vue'
  import { TopUpParams } from '/@/api/sys/model/userModel'

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
      title: 'Register Date',
      dataIndex: 'registerDate',
      align: 'center',
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      align: 'center',
    },
    {
      title: 'Account Balance',
      dataIndex: 'accountBalance',
      align: 'center',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      align: 'center',
    },
    {
      title: 'Operation',
      key: 'operation',
      dataIndex: 'operation',
      align: 'center',
    },
  ]

  let topUpModalVisible = ref(false)

  let data: any = ref([])

  let dataToShow: any = ref([])

  let topUpUserID: any = ref(0)
  let topUpAmount: any = ref(100)

  const getUserList = async () => {
    data.value.splice(0, data.value.length)
    dataToShow.value.splice(0, dataToShow.value.length)
    const res = await getUserListByRole('members')
    console.log(res)
    for (let i = 0; i < res.length; i++) {
      data.value.push({
        key: res[i].id,
        name: res[i].username,
        email: res[i].email,
        registerDate: '2023-03-06',
        joinDate: '2023-03-06',
        accountBalance: res[i].balance,
        discount: '×0.8',
      })
    }
    for (let i = 0; i < data.value.length; i++) {
      dataToShow.value.push(data.value[i])
    }
  }

  onMounted(async () => {
    await getUserList()
  })

  const topUp = async (user: any) => {
    if (!(await permissionVerifyUser(user.name))) {
      notification.error({
        message: 'Error Tip',
        description: "You don't have permission to top up yourself.",
      })
      return
    }
    topUpUserID.value = user.key
    topUpModalVisible.value = true
  }

  const topUpAction = async () => {
    let params: TopUpParams = {
      id: topUpUserID.value,
      recharge: topUpAmount.value,
    }
    const res = await topUpApi(params)
    if (res) {
      notification.success({
        message: 'Success Tip',
        description: 'Top up successfully.',
      })
      await getUserList()
    }
    topUpModalVisible.value = false
    topUpUserID.value = 0
    topUpAmount.value = 100
  }

  const editUser = async (user: any) => {
    if (!(await permissionVerifyUser(user.name))) {
      notification.error({
        message: 'Error Tip',
        description: "You don't have permission to edit yourself.",
      })
      return
    }
    alert('edit')
  }

  const deleteUser = async (user: any) => {
    if (!(await permissionVerifyUser(user.name))) {
      notification.error({
        message: 'Error Tip',
        description: "You don't have permission to delete yourself.",
      })
      return
    }
  }

  const deleteUserAction = async (user: any) => {
    await deleteUserApi(user.name)
    await getUserList()
    notification.success({
      message: 'Success Tip',
      description: 'Delete user successfully.',
    })
  }

  const resetFilterOptions = () => {
    formState.name = ''
    formState.email = ''
    formState.joinDate = null

    dataToShow.value.splice(0, dataToShow.value.length)
    for (let i = 0; i < data.value.length; i++) {
      dataToShow.value.push(data.value[i])
    }
  }

  const filter = () => {
    dataToShow.value.splice(0, dataToShow.value.length)
    for (let i = 0; i < data.value.length; i++) {
      dataToShow.value.push(data.value[i])
    }
    let joinDate = timestampToTime(formState.joinDate)
    for (let i = 0; i < dataToShow.value.length; i++) {
      if (formState.name !== '') {
        if (dataToShow.value[i].name !== formState.name) {
          dataToShow.value.splice(i, 1)
          i--
          continue
        }
      }
      if (formState.email !== '') {
        if (dataToShow.value[i].email !== formState.email) {
          dataToShow.value.splice(i, 1)
          i--
          continue
        }
      }
      if (formState.joinDate !== null) {
        if (dataToShow.value[i].registerDate !== joinDate) {
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
