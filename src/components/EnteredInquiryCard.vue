<script setup lang="ts">
import Entry from "@/data/interfaces/Entry";
import {defineProps, defineEmits} from "vue";

const props = defineProps<{
    entry: Entry
}>();

const emit = defineEmits<{
    editEntry: [id: number]
    addEntry: [questionId: number]
}>();

function formatDate(date: string): string {
    return new Date(date).toTimeString();
}

</script>
<template>

    <v-card variant="tonal">
        <v-card-item>
            <v-card-subtitle>
                
                <div><v-icon :start="true">mdi-phone</v-icon>{{ formatDate(props.entry.timestamp) }}</div>
            </v-card-subtitle>
            <v-card-text>
                <div class="text-h6" v-text="props.entry.categoryName"></div>
                <div class="text-caption" v-text="props.entry.questionText"></div>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" variant="outlined" density="compact" prepend-icon="mdi-pencil" @click="emit('editEntry', props.entry.id)">Edit</v-btn>
                <v-btn color="success" variant="outlined" density="compact" prepend-icon="mdi-plus" @click="emit('addEntry', props.entry.questionId)">Quick Add</v-btn>
            </v-card-actions>
        </v-card-item>

    </v-card>
</template>
