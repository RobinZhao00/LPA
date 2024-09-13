import { lazy } from 'react';
import Home from './Home';

const About = lazy(() => import('./About'));
const Contact = lazy(() => import('./Contact'));
// ... 其他页面组件

export { About, Contact, Home };
