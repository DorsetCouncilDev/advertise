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

  // Homepage
  {
    path: '/advertise',
    component: Home,
    meta: {
      title: 'Roundabout sponsorship & advertising | Dorset Council',
      description: 'Promote your business through roundabout sponsorship & local advertising in Dorset. Advertising opportunities benefiting both your local services & brand.'
    }
  },

  // Contact page
  {
    path: '/advertise/contact',
    component: ContactForm,
    meta: {
      title: 'Contact us to advertise in Dorset | Dorset Council',
      description: 'Dorset Council offers prominent roundabout advertising locations in Dorset. Contact us today for details about locations, costs and availability.'
    }
  },

  // Mediapack page
  {
    path: '/advertise/mediapack',
    component: Mediapack,
    meta: {
      title: 'Sponsorship & advertising media pack | Dorset Council',
      description: 'Download our media pack and see how your business can benefit from roundabout sponsorship, bus shelter advertising, car parking ticket adverts and more.'
    }
  },

  // FAQ Page
  {
    path: '/advertise/faq',
    component: Faq,
    meta: {
      title: 'Roundabout sponsorship FAQs | Dorset Council',
      description: 'Answers to your questions about roundabout sponsorship and advertising in Dorset, from how much it costs, to how to apply and display your message.'
    }
  },

  // Search page
  {
    path: '/advertise/search',
    component: Search,
    meta: {
      title: 'Find advertising options in Dorset | Dorset Council',
      description: 'Find cost effective local advertising locations in Dorset.  Promote your business with Dorset Council by sponsoring a roundabout or advertising in Dorset.'
    }
  },

  // Search document type
  {
    path: '/advertise/search/:documentTypeRef',
    component: Search,
    props: true,
    meta: {
      title: 'Find advertising options in Dorset | Dorset Council',
      description: 'Find cost effective local advertising locations in Dorset.  Promote your business with Dorset Council by sponsoring a roundabout or advertising in Dorset.'
    }
  },
   
  // Asset page
{
    path: '/advertise/:documentRef',
    component: Asset,
    props: true

},


  {
    path: '/advertise/search/view/:initialView',
    component: Search,
    props: true,
    meta: {
      title: 'Find advertising options in Dorset | Dorset Council',
      description: 'Find cost effective local advertising locations in Dorset.  Promote your business with Dorset Council by sponsoring a roundabout or advertising in Dorset.'
    }
  },
  
 

  {
    path: '/advertise/contact/:documentRef/:action',
    component: ContactForm,
    props: true,
    meta: {
      title: 'Contact us to advertise in Dorset | Dorset Council',
      description: 'Dorset Council offers prominent roundabout advertising locations in Dorset. Contact us today for details about locations, costs and availability.'
    }
  },

 
  {
    path: '*',
    redirect: '/advertise'
  },
]

export default routes;
