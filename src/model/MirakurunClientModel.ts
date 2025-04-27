import * as fs from 'fs';
import { inject, injectable } from 'inversify';
import * as path from 'path';
import IConfigFile from './IConfigFile';
import IConfiguration from './IConfiguration';
import IMirakurunClientModel from './IMirakurunClientModel';

/**
 * EPGStation client to fetch EPG data
 */
@injectable()
export default class EPGStationClientModel implements IMirakurunClientModel {
    private config: IConfigFile;

    constructor(@inject('IConfiguration') conf: IConfiguration) {
        this.config = conf.getConfig();
    }

    /**
     * Fetch EPG data from EPGStation
     * @return EPG data
     */
    public async getEPGData(): Promise<any> {
        const epgPath = this.config.epgPath; // Assume `epgPath` is defined in the configuration
        if (!epgPath) {
            throw new Error('EPG Path is not configured');
        }

        const epgData = JSON.parse(fs.readFileSync(path.resolve(epgPath), 'utf-8'));
        return epgData;
    }
}
