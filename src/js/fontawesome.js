import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

library.add(faArrowCircleRight, faEnvelope, faWhatsapp);
dom.i2svg();
