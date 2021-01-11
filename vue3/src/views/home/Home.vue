<template>
  <div id="home">
    <a-tabs type="card">
      <a-tab-pane key="add" tab="新增">
        <Add></Add>
      </a-tab-pane>
      <a-tab-pane key="query" tab="查询">
        <Query></Query>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    Add: require('views/add/Add.vue').default,
    Query: require('views/query/Query.vue').default
  }
};
</script>

<style lang="scss" scoped></style>
