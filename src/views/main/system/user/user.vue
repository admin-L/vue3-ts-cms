<template>
  <div class="user">
    <div class="search">
      <IForm v-bind="searchFormConfig"></IForm>
      <!-- <el-form label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户名">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="喜欢的运动">
              <el-select style="width: 100%;">
                <el-option> 篮球 </el-option>
                <el-option> 足球 </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间">
              <el-date-picker style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  name: 'user',
  components: {
    IForm,
  },
  setup() {
    return { searchFormConfig }
  },
})
</script>

<style scoped></style>
