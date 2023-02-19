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
        <FormItem label="Select a period" name="startDate" style="margin-bottom: 15px">
          <Select
            v-model:value="formState.startDate"
            placeholder="Please select"
            style="width: 200px"
          >
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
          </Select>
        </FormItem>
        <span style="color: rgb(217, 217, 217); margin-right: 15px; position: relative; top: 3px"
          >—</span
        >
        <FormItem label="" name="endDate" style="margin-bottom: 15px">
          <Select
            v-model:value="formState.endDate"
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
      "
    >
      <div style="position: relative; left: 15px; top: 10px">
        <span style="font-weight: bold; font-size: 15px">Income</span>
        <span style="margin-left: 40px; font-size: 17px">In total: </span>
        <span style="font-size: 20px; color: #569c30; position: relative; top: 1px"> $1600</span>
      </div>
      <div style="margin-top: 35px; margin-left: 15px">
        <Timeline>
          <TimelineItem v-for="item in incomeItems" :key="item.description">
            <div style="display: flex; justify-content: space-between">
              <div>
                <span style="font-size: 15px; font-weight: bold; color: #569c30">{{
                  item.money
                }}</span>
                <span style="font-size: 15px; margin-left: 15px">{{ item.description }}</span>
              </div>
              <span style="font-size: 15px">{{ item.date }} {{ item.time }}</span>
            </div>
          </TimelineItem>
        </Timeline>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  import { Form, FormItem, Select, Button, Timeline, TimelineItem } from 'ant-design-vue'

  interface FormState {
    startDate: any
    endDate: any
  }
  const formState = reactive<FormState>({
    startDate: null,
    endDate: null,
  })
  const incomeItems = [
    {
      money: '$200',
      description: "Book Swimming pool's general use for 2 hours",
      date: '2021-05-01',
      time: '10:00',
    },
    {
      money: '$200',
      description: "Book Swimming pool's general use for 2 hours",
      date: '2021-05-01',
      time: '10:00',
    },
    {
      money: '$200',
      description: "Book Swimming pool's general use for 2 hours",
      date: '2021-05-01',
      time: '10:00',
    },
    {
      money: '$200',
      description: "Book Swimming pool's general use for 2 hours",
      date: '2021-05-01',
      time: '10:00',
    },
    {
      money: '$200',
      description: "Book Swimming pool's general use for 2 hours",
      date: '2021-05-01',
      time: '10:00',
    },
    {
      money: '$200',
      description: "Book Swimming pool's general use for 2 hours",
      date: '2021-05-01',
      time: '10:00',
    },
    {
      money: '$200',
      description: "Book Swimming pool's general use for 2 hours",
      date: '2021-05-01',
      time: '10:00',
    },
    {
      money: '$200',
      description: "Book Swimming pool's general use for 2 hours",
      date: '2021-05-01',
      time: '10:00',
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
</style>
