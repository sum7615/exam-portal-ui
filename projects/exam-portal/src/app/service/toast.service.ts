import { Injectable, ApplicationRef, ComponentRef, Injector, ComponentFactoryResolver } from '@angular/core';
import { ToastComponent } from '../toast/toast.component';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) {}

  show(message: string) {
    const factory = this.resolver.resolveComponentFactory(ToastComponent);
    const componentRef: ComponentRef<ToastComponent> = factory.create(this.injector);
    componentRef.instance.message = message;

    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    setTimeout(() => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }, 5500); // slightly more than fade out
  }
}
