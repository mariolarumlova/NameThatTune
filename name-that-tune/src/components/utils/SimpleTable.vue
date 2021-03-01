<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.apiName" class="text-left">
            {{ header.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td v-for="header in headers" :key="header.apiName">
            {{ item[header.apiName] }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    headers: Array,
    items: Array
  }
};
</script>
