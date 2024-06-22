<script setup lang="ts">
import StatisticQuestionCount from "@/data/interfaces/StatisticQuestionCount";
import {defineProps, defineEmits} from "vue";

const props = defineProps<{
    stat: StatisticQuestionCount
}>();

const emit = defineEmits<{
    addEntry: [questionId: number]
}>();

</script>
<template>
    
    <v-card variant="tonal">

        <v-card-item>
            
            <v-card-text>
                <v-badge color="info" :content="props.stat.count"></v-badge>
                <div class="text-h6" v-text="props.stat.categoryName"></div>
                <div class="text-caption" v-text="props.stat.questionText"></div>
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" variant="outlined" density="compact" prepend-icon="mdi-plus" @click="emit('addEntry', props.stat.questionId)">Quick Add</v-btn>
            </v-card-actions>
        </v-card-item>

    </v-card>
</template>
