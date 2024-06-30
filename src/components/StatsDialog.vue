<script setup lang="ts">
import {ref } from "vue";
import StatisticQuestionCountByLocation from "@/data/interfaces/StatisticQuestionCountByLocation";
import { getQuestionCountByLocation } from "@/data/repositories/Statistics";

const props = defineProps<{show: boolean}>()

const emit = defineEmits<{close: []}>();

const stats = ref<StatisticQuestionCountByLocation[]>([]);

async function loadStats() {
    stats.value = await getQuestionCountByLocation();
}

function getLocationName(id: number): string {
    if (id === 0) return "Phone";
    if (id === 1) return "Main desk";
    return "Satellite Desk";
}

// function downloadEntries() {
//     const csvContent = entries.value.map(x => x.categoryName + ",\"" + x.questionText + "\"," + x.locationId + "\n");
//     const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
//     window.open(encodedUri);
//   }
</script>
<template>
    <v-dialog v-model="props.show" fullscreen>
        <v-card>
                <v-toolbar>
          
          <v-toolbar-title>Statistics</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn
            @click="loadStats"
            color="primary"
          >Load Stats</v-btn>
            <v-btn
            icon="mdi-close"
            @click="emit('close')"
          ></v-btn>

          </v-toolbar-items>
        </v-toolbar>
            <v-card-text>
                
                <v-table density="compact">                    
    <thead>
      <tr>
        <th class="text-left">
          Category
        </th>
        <th class="text-left">
          Question
        </th>
        <th class="text-left">
          Location
        </th>
        <th class="text-left">
          Count
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="stat in stats"        
      >
        <td>{{ stat.categoryName }}</td>
        <td>{{ stat.questionText }}</td>
        <td>{{ getLocationName(stat.locationId) }}</td>
        <td>{{ stat.count }}</td>
      </tr>
    </tbody>
  </v-table>
  
            </v-card-text>
        </v-card>
    </v-dialog>

</template>