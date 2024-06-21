<script setup lang="ts">
import Category from "@/data/interfaces/Category";
import {defineProps} from "vue";

const props = defineProps<{
    categories: Category[]
}>();

</script>
<template>
    <v-container fluid>
        <v-row dense>
            <v-col v-for="category in props.categories">
                <v-card :title="category.name"></v-card>
            </v-col>            
        </v-row>
    </v-container>
</template>