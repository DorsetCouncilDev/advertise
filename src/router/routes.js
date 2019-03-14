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
import ContactForm from '../components/ContactForm';
import Faq from '../components/application/faq/Faq';
import Mediapack from '../components/application/mediapack/Mediapack';
import Search from '../components/application/search/Search';
import Asset from '../components/application/Asset/Asset';
import Home from '../components/application/home/Home';
import ParkingMap from '../components/ParkingMap';
import AdminLogin from '../components/admin/Login';
import AssetsList from '../components/admin/index/AssetsList';
import AssetsView from '../components/admin/index/AssetView';
import AssetLocations from '../components/admin/index/AssetLocations';
import ManageLocations from '../components/admin/document/ManageLocations';
// import ManageImages from '../components/admin/document/ManageImages';
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
   /* {
        path: '/advertise/admin/indexes/:indexRef/:documentRef/images',
        component: ManageImages,
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
        path: '/advertise',
        component: Home,
        meta: {
            title: 'Advertising in Dorset',
            description: 'Dorset Council offers advertising opportunities around Dorset. Opportunities include Roundabout and boundary signage sponsorship, as well as car parking, bus shelter, vehicle and bin lid advertising. Here you can find opportunities you are interested in, check their availability, see their costs and contact us about booking them.'
        }
    }, 
    { path: "*",   component: Home,
        meta: {
            title: 'Advertising in Dorset'
        }
    },
    {
        path:  '/advertise/search',
        component: Search,
        meta: {
            title: 'Advertising opportunities available in Dorset'
        }
    },
    {
        path:  '/advertise/search/:documentTypeRef',
        component: Search,
        props:true,
        meta: {
            title: 'Advertising opportunities available in Dorset'
        }
    },
    {
        path: '/advertise/:documentRef',
        component: Asset,
        props: true
    
    },
    {
        path: '/advertise/info/mediapack',
        component: Mediapack,
        meta: {
            title: 'Download Advertising in Dorset media pack'
        }
    },
      {
        path: '/advertise/info/contact/:documentRef/:action',
        component: ContactForm,
          props:true,
        meta: {
            title: 'Contact Advertise Dorset'
        }
    },
    {
        path: '/advertise/info/contact/:documentRef/:action',
        component: ContactForm,
          props:true,
        meta: {
            title: 'Contact Advertise Dorset'
        }
    },
    {
        path: '/advertise/info/contact',
        component: ContactForm,
        meta: {
            title: 'Contact Advertise Dorset'
        }
    },
    {
        path: '/advertise/info/faq',
        component: Faq,
        meta: {
            title: 'Frequently asked questions - Advertise Dorset'
        }
    }
]

export default routes;
