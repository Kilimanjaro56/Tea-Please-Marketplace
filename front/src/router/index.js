//  Routes Set Up - Keely(To ensure we can access all pages without relying on other members' code)

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    props: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    props: true,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue'),
    props: true,
  },
  {
    path: '/',
    name: 'Browse',
    component: () => import('../views/Browse.vue'),
    props: true,
  },
  {
    path: '/listings/:listingId',
    name: 'ListingDetail',
    component: () => import('../views/ListingDetail.vue'),
    props: true,
  },
  {
    path: '/listings/edit/:listingId',
    name: 'EditListing',
    component: () => import('../views/EditListing.vue'),
    props: true,
  },
  {
    path: '/create-listing',
    name: 'CreateListing',
    component: () => import('../views/CreateListing.vue'),
    props: true,
  },
  {
    path: '/my-listings',
    name: 'MyListings',
    component: () => import('../views/MyListings.vue'),
    props: true,
  },
  {
    path: '/payment/:listingId',
    name: 'Payment',
    component: () => import('../views/Payment.vue'),
    props: true,
  },
  {
    path: '/payment-confirmation/:listingId',
    name: 'PaymentConfirmation',
    component: () => import('../views/PaymentConfirmation.vue'),
    props: true,
  },
  {
    path: '/favourites',
    name: 'Favourites',
    component: () => import('../views/Favourites.vue'),
    props: true,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
