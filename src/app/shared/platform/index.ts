import * as PlatformActions from './actions/platform.actions';
import { Platform, PlatformFilter } from './models';
import * as fromPlatform from './selectors/platform.selectors';
import { PlatformService } from './services/platform.service';

export { fromPlatform, PlatformActions, PlatformFilter, Platform, PlatformService };

