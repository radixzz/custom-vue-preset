// To load from root static folder:
// import { environment } from '@/config'
// preloader.add(`${environment.url.public}/img/image-name.jpg`)

import Preloader from 'preloader'

const preloader = new Preloader({})
console.log(require('assets/svg/captions-off.svg'));
preloader.add(require('assets/data/data.json'));

export default preloader
