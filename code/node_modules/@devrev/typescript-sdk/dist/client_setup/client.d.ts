import { betaSDK, publicSDK } from '../index';
export declare namespace client {
    interface SetupOptions {
        endpoint: string;
        token?: string;
    }
}
export declare class client {
    static setup(setup_options: client.SetupOptions): publicSDK.Api<unknown>;
    static setupBeta(setup_options: client.SetupOptions): betaSDK.Api<unknown>;
}
