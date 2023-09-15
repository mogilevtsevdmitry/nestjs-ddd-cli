import { Global, Module } from '@nestjs/common';
import { UserDomainModule } from '@domains/user-domain';
import { UserAdapterService } from './user-adapter/user-adapter-service';
import { TestDomainModule } from '@domains/test-domain';
import { TestAdapterService } from './test-adapter/test-adapter-service';

@Global()
@Module({
    imports: [
        TestDomainModule.register({ testProviders: TestAdapterService }),
        UserDomainModule.register({ userProviders: UserAdapterService }),
    ],
    providers: [
        TestAdapterService,
        UserAdapterService,
    ],
    exports: [
        TestDomainModule,
        UserDomainModule,
    ],
})
export class InfrastructureModule {}
