<template>
  <v-container>
    <v-responsive
      class="align-centerfill-height mx-auto"
      
    >
    <v-navigation-drawer>
      <v-card>
        <v-card-title>Total Inquiries</v-card-title>
        <v-card-text><div class="text-h2">169</div></v-card-text>
      </v-card>
  <EnteredInquiryCard></EnteredInquiryCard>
  <EnteredInquiryCard></EnteredInquiryCard>
  <EnteredInquiryCard></EnteredInquiryCard>
</v-navigation-drawer>
<v-row>
  <v-col :cols="3">
    <v-btn-toggle>
      <v-btn prepend-icon="mdi-phone">Phone</v-btn>
      <v-btn prepend-icon="mdi-information-variant">Main Desk</v-btn>
      <v-btn prepend-icon="mdi-satellite-uplink">Satellite Desk</v-btn>
    </v-btn-toggle>
  </v-col>
  <v-col :cols="7">
    <v-autocomplete></v-autocomplete>
  </v-col>
  <v-col :cols="2">
    <v-btn prepend-icon="mdi-sort">Sort Categories</v-btn>
  </v-col>
</v-row>
  
  
  <InquiryButtonPanel></InquiryButtonPanel>

  <v-navigation-drawer location="right">
      <v-card>
        <v-card-title>Top Inquiries</v-card-title>        
        <v-card-text>
          <v-empty-state headline="No Inquiries yet" text="Enter inquiries to see stuff here" icon="mdi-magnify"></v-empty-state>
        </v-card-text>
      </v-card>
  
</v-navigation-drawer>
      
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
  import EnteredInquiryCard from './EnteredInquiryCard.vue';
  import InquiryButtonPanel from './InquiryButtonPanel.vue';
</script>
