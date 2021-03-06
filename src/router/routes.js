import ContactForm from '../components/ContactForm';
import Faq from '../components/application/faq/Faq';
import Mediapack from '../components/application/mediapack/Mediapack';
import Search from '../components/application/search/Search';
import Asset from '../components/application/Asset/Asset';
import Home from '../components/application/home/Home';
// import ManageImages from '../components/admin/document/ManageImages';

const routes = [

  {
    path: '/advertise',
    component: Home,
    meta: {
      title: 'Roundabout sponsorship & advertising | Dorset Council',
      description: 'Promote your business through roundabout sponsorship & local advertising in Dorset. Advertising opportunities benefiting both your local services & brand.'
    }
  },
  {
    path: '/advertise/contact',
    component: ContactForm,
    meta: {
      title: 'Contact us to advertise in Dorset | Dorset Council',
      description: 'Dorset Council offers prominent roundabout advertising locations in Dorset. Contact us today for details about locations, costs and availability.'
    }
  },
  {
    path: '/advertise/info/contact', redirect: '/advertise/contact'
  },
  {
    path: '/advertise/mediapack',
    component: Mediapack,
    meta: {
      title: 'Sponsorship & advertising media pack | Dorset Council',
      description: 'Download our media pack and see how your business can benefit from roundabout sponsorship, bus shelter advertising, car parking ticket adverts and more.'
    }
  },
  {
    path: '/advertise/info/mediapack', redirect: '/advertise/mediapack'
  },
  {
    path: '/advertise/faq',
    component: Faq,
    meta: {
      title: 'Roundabout sponsorship FAQs | Dorset Council',
      description: 'Answers to your questions about roundabout sponsorship and advertising in Dorset, from how much it costs, to how to apply and display your message.'
    }
  },
  {
    path: '/advertise/info/faq', redirect: '/advertise/faq'
  },
  {
    path: '/advertise/search',
    component: Search,
    meta: {
      title: 'Find advertising options in Dorset | Dorset Council',
      description: 'Find cost effective local advertising locations in Dorset.  Promote your business with Dorset Council by sponsoring a roundabout or advertising in Dorset.'
    }
  },
  {
    path: '/advertise/:documentRef',
    component: Asset,
    props: true

  },
  {
    path: '*',
    redirect: '/advertise'
  },
]

export default routes;
