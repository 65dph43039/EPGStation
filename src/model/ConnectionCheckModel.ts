import { inject, injectable } from 'inversify';
import mirakurun from 'mirakurun';
import Util from '../util/Util';
import IDBOperator from './db/IDBOperator';
import IConnectionCheckModel from './IConnectionCheckModel';
import ILogger from './ILogger';
import ILoggerModel from './ILoggerModel';
import IMirakurunClientModel from './IMirakurunClientModel';

@injectable()
export default class ConnectionCheckModel implements IConnectionCheckModel {
    private log: ILogger;
    private mirakurunClient: mirakurun;
    private dbOperator: IDBOperator;

    constructor(
        @inject('ILoggerModel') logger: ILoggerModel,
        @inject('IMirakurunClientModel') mirakurunClientModel: IMirakurunClientModel,
        @inject('IDBOperator') dbOperator: IDBOperator,
    ) {
        this.log = logger.getLogger();
        this.mirakurunClient = mirakurunClientModel.getClient();
        this.dbOperator = dbOperator;
    }

    /**
     * mirakurun との接続を待つ
     * @return Promise<void>
     */
    public async checkEPGAvailability(): Promise<void> {
    while (true) {
        try {
            this.log.system.info('Checking EPG data availability');
            const epgData = await this.epgStationClient.getEPGData(); // Using the new client
            if (epgData) break;
        } catch (err: any) {
            await Util.sleep(1000); // Retry every second
        }
    }
}

    /**
     * DB との接続を待つ
     */
    public async checkDB(): Promise<void> {
        while (true) {
            try {
                this.log.system.info('check db');
                await this.dbOperator.checkConnection();
                break;
            } catch (err: any) {
                await Util.sleep(1000);
            }
        }
    }
}
