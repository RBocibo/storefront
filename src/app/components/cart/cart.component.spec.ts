import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../models/cart-item';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [CartService],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);

    const mockCartItems: CartItem[] = [
      { product: { id: 1, title: 'Product A', price: 10, description: "prod A description", category:"clothes",image: "tshirt.png" }, quantity: 2 },
      { product: { id: 2, title: 'Product B', price: 15, description: "prod B description", category:"bags",image: "silverbad.png"}, quantity: 3 },
    ];

    fixture.detectChanges();
  });

  it('It should create', () => {
    expect(component).toBeTruthy();
  });

  it('It calculate total items in the cart', () => {
    const expectedTotalItems = 5; 
    expect(component.getTotalItems()).toBe(expectedTotalItems);
  });

  it('It calculate total price in the cart', () => {
    const expectedTotalPrice = 2 * 10 + 3 * 15; 
    expect(component.getTotalPrice()).toBe(expectedTotalPrice);
  });

  it('It call cartService.addToCart() when incrementItem is called', () => {
    const productToAdd: any = { id: 3, name: 'Product C', price: 20 };
    spyOn(cartService, 'addToCart');
    component.incrementItem({ product: productToAdd, quantity: 1 });
    expect(cartService.addToCart).toHaveBeenCalledWith(productToAdd);
  });

  it('It call cartService.removeFromCart() when removeItem is called', () => {
    const productIdToRemove = 1;
    spyOn(cartService, 'removeFromCart');
    component.removeItem(productIdToRemove);
    expect(cartService.removeFromCart).toHaveBeenCalledWith(productIdToRemove);
  });

  it('It call cartService.clearCart() when clearCart is called', () => {
    spyOn(cartService, 'clearCart');
    component.clearCart();
    expect(cartService.clearCart).toHaveBeenCalled();
  });

  it('It call cartService.decrementFromCart() when decrementItem is called', () => {
    const productToDecrement: any = { id: 1, name: 'Product A', price: 10 };
    spyOn(cartService, 'decrementFromCart');
    component.decrementItem({ product: productToDecrement, quantity: 2 });
    expect(cartService.decrementFromCart).toHaveBeenCalledWith(
      productToDecrement.id
    );
  });
})