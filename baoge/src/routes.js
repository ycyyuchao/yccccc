import Home from './components/home/home';
import About from './components/about/about';
import Systems from './components/systems/systems';
import System from './components/system/system';
import News from './components/news/news';
import New from './components/new/new';
import Jump from './components/public/jump';


export const routes = [
	{ path:'/',component:Home },
    { path:'/about',component:About },
    { path:'/system',component:Systems },
    { path:'/system/:id',component:System },
    { path:'/news',component:News },
    { path:'/news/:id',component:New },
    { path:'/jump',component:Jump }		
];