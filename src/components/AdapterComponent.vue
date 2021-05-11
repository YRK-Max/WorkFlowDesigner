<template>
  <div>
    <a-input v-model="values.inputVal" placeholder="请输入内容" v-show="status.inputShow"></a-input>
    <a-select v-model="values.selectVal" placeholder="请选择" v-show="status.selectShow">
      <a-select-option
        v-for="item in data"
        :key="item.VALUE"
        :label="item.TEXT"
        :value="item.VALUE">
      </a-select-option>
    </a-select>
  </div>

</template>
<script>
const forEach = require('lodash/forEach')
export default {
  props:['type','data','value'],
  data(){
    return {
      values:{
        selectVal:'',
        treeVal:'',
        inputVal:'',
        lookupVal: ''
      },
      status:{
        selectShow:false,
        treeShow:false,
        inputShow:false,
        lookupShow: false
      }

    }
  },
  mounted(){
    this.showCompoent(this.type,this);
    this.setComponentVal(this.type,this);
  },
  watch:{
    'values.selectVal':function(newVal){
      this.$emit('input',newVal);
    },
    'values.treeVal':function(newVal){
      this.$emit('input',newVal);
    },
    'values.inputVal':function(newVal){
      this.$emit('input',newVal);
    },
    type(newVal,oldVal){
      if(newVal !== oldVal){
        this.showCompoent(newVal,this);
      }
    },
    value(newVal){
      console.log(newVal);
      this.setComponentVal(this.type,this);
    }
  },

  methods: {
    showCompoent(type,vm){
      let statusShowName = type + 'Show';
      //将需要显示组件显示。其他组件隐藏
      forEach(vm.status,function(value,key){
        if(key == statusShowName ){
          vm.status[key] = true;
        }else{
          vm.status[key] = false;
        }
      });
    },
    setComponentVal(type,vm){
      let valName = type +"Val";
      forEach(vm.values,function(value,key){
        if(key == valName){
          vm.values[key] = vm.value;
        }
      });
    }
  }
}

</script>
<style >

</style>