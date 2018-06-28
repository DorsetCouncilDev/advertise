import DevHome from '../DevHome';


// admin
import AdminNav from '../components/admin/AdminNav';
import AdminHome from '../components/admin/Home';

// List indexes
import Indexes from '../components/admin/index/Indexes';
// View index
import Index from '../components/admin/index/Index';



const dcc = '/dcc.dorsetforyou/'


// application data store
import store from '../store';

// application
import Search from '../components/application/search/Search';
import Asset from '../components/application/Asset/Asset';
import Home from '../components/application/home/Home';
import ParkingMap from '../components/ParkingMap';
import AdminLogin from '../components/admin/Login';
import AssetsList from '../components/admin/index/AssetsList';
import AssetsView from '../components/admin/index/AssetView';
import AssetLocations from '../components/admin/index/AssetLocations';
const routes = [
   
    {
        path: dcc,
        component: DevHome
    },
    {
        path:  '/admin',
         component: AdminLogin,
           beforeEnter: (to, from, next) => {
            if(store.state.securityToken != null && store.state.securityToken != '')
                next('/admin/indexes')
               else
                next()
            
      }
    },
    {
        // List of all indexes
        path:  '/admin/indexes',
        component: Indexes,
        beforeEnter: (to, from, next) => {
            if(store.state.securityToken != null && store.state.securityToken != '')
                next()
            else
                next('/admin')
      }
    },
    
       {

        // View index with ref
        path: '/admin/indexes/:indexRef/assets',
        component: AssetsList,
        props: true,
        beforeEnter: (to, from, next) => {
            if(store.state.securityToken != null && store.state.securityToken != '')
                next()
            else
                next('/admin')
      }
    },
   {

        // View index with ref
        path: '/admin/indexes/:indexRef/assets/:documentRef',
        component: AssetsView,
        props: true,
        beforeEnter: (to, from, next) => {
            if(store.state.securityToken != null && store.state.securityToken != '')
                next()
            else
                next('/admin')
      }
    },
     {

        // View index with ref
        path: '/admin/indexes/:indexRef/assets/:documentRef/locations',
        component: AssetLocations,
        props: true,
        beforeEnter: (to, from, next) => {
            if(store.state.securityToken != null && store.state.securityToken != '')
                next()
            else
                next('/admin')
      }
    },
    
    
    
    
    {

        // View index with ref
        path: '/admin/indexes/:indexRef',
        component: Index,
        props: true,
        beforeEnter: (to, from, next) => {
            if(store.state.securityToken != null && store.state.securityToken != '')
                next()
            else
                next('/admin')
      }
    },
    
    {
        path: '/',
        component: Home,

          meta: {
            title: 'Advertise Dorset Home'
        }
        
    }, 
    {
        path:  '/search',
        component: Search,
        meta: {
            title: 'Search opportunities'
        }
    },
    {
        path: '/:documentRef',
        component: Asset,
        props: true,
        meta: {
            title: 'Advertising opportunity details'
        }
    }
]

export default routes;
