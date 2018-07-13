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
import ManageLocations from '../components/admin/document/ManageLocations';
import MyMap from '../components/admin/document/MyMap';
const routes = [
   
 
    {
        path:  '/advertise/admin',
         component: AdminLogin,
           beforeEnter: (to, from, next) => {
            if(store.state.securityToken != null && store.state.securityToken != '')
                next('/advertise/admin/indexes')
               else
                next()
            
      }
    },
    {
        // List of all indexes
        path:  '/advertise/admin/indexes',
        component: Indexes,
        beforeEnter: (to, from, next) => {
            if(store.state.securityToken != null && store.state.securityToken != '')
                next()
            else
                next('/advertise/admin')
      }
    },
    
       {

        // View index with ref
        path: '/advertise/admin/indexes/:indexRef/assets',
        component: AssetsList,
        props: true,
        beforeEnter: (to, from, next) => {
            if(store.state.securityToken != null && store.state.securityToken != '')
                next()
            else
                next('/advertise/admin')
      }
    },
   {

        // View index with ref
        path: '/advertise/admin/indexes/:indexRef/assets/:documentRef',
        component: AssetsView,
        props: true,
        beforeEnter: (to, from, next) => {
            if(store.state.securityToken != null && store.state.securityToken != '')
                next()
            else
                next('/advertise/admin')
      }
    },
    
    
 /*    
    {
        // View index with ref
        path: '/advertise/admin/indexes/:indexRef/assets/:documentRef/locations',
        component: AssetLocations,
        props: true,
        beforeEnter: (to, from, next) => {
            if(store.state.securityToken != null && store.state.securityToken != '')
                next()
            else
                next('/advertise/admin')
      }
    },
*/
    
    {

        // View index with ref
        path: '/advertise/admin/indexes/:indexRef/:documentRef/locations',
        component: ManageLocations,
        props: true,
        beforeEnter: (to, from, next) => {
            if(store.state.securityToken != null && store.state.securityToken != '')
                next()
            else
                next('/advertise/admin')
        }
    },
    
    {
        path: '/advertise/admin/indexes/:indexRef',
        component: Index,
        props: true,
        beforeEnter: (to, from, next) => {
            if(store.state.securityToken != null && store.state.securityToken != '')
                next()
            else
                next('/advertise/admin')
        }
    },
    
    {
        path: '/advertise',
        component: Home,
        meta: {
            title: 'Advertise Dorset Home'
        }
    }, 
    {
        path:  '/advertise/search',
        component: Search,
        meta: {
            title: 'Search opportunities'
        }
    },
    {
        path: '/advertise/:documentRef',
        component: Asset,
        props: true,
        meta: {
            title: 'Advertising opportunity details'
        }
    }
]

export default routes;
