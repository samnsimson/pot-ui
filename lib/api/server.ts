import "server-only";
import { AppsApi, AuthApi, Configuration, ContentApi, MediaApi } from "@/api/client";
import { env } from "@/env";

export class ServerApi {
    private config: Configuration;
    public readonly auth: AuthApi;
    public readonly apps: AppsApi;
    public readonly media: MediaApi;
    public readonly content: ContentApi;

    constructor(config?: Configuration) {
        this.config = config ?? new Configuration({ basePath: env.SERVER_BASE_PATH });
        this.auth = new AuthApi(this.config);
        this.apps = new AppsApi(this.config);
        this.media = new MediaApi(this.config);
        this.content = new ContentApi(this.config);
    }
}
