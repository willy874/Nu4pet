import IconComponent from './icon-component';

const IconInstall = {
	install(Vue) {
		Vue.component( 'icon-component', IconComponent );
	},
	component: IconComponent
};

export default IconInstall;