// es6 polyfill
import 'core-js/fn/array/find';
import 'core-js/fn/array/find-index';

import FooterNav from './commonComponents/FooterNav/main';
import Loading from './commonComponents/Loading/main';
import Modal from './commonComponents/Modal/main';
import Progressbar from './commonComponents/Progressbar/main';
import Range from './commonComponents/Range/main';
import Switchbox from './commonComponents/Switchbox/main';
import Tab from './commonComponents/Tab/main';
import Toast from './commonComponents/Toast/main';

const components = {
    FooterNav,
    Loading,
    Modal,
    Progressbar,
    Range,
    Switchbox,
    Tab,
    Toast
};

const install = function(Vue, opts = {}) {
    if (install.installed) return;

    Object.keys(components).forEach(key => {
        Vue.component(key, components[key]);
    });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const API = {
    version: process.env.VERSION, // eslint-disable-line no-undef
    install,
    ...components
};

export default API;   // eslint-disable-line no-undef
