import PhotoFrame from './image-upload/photo-frame'
// import PhotoAlbum from './image-upload/photo-album'
import TextInput from './text-input'
import TextareaBox from './textarea-box'
import ErrorMessage from './error-message'

const FromInstall = {
	install(Vue) {
		Vue.component( 'photo-frame', PhotoFrame )
		// Vue.component( 'photo-album', PhotoAlbum )
		Vue.component( 'text-input', TextInput )
		Vue.component( 'textarea-box', TextareaBox )
		Vue.component( 'error-message', ErrorMessage )

	}
};

export default FromInstall;