import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductApiService } from '../../services/product-api.service';
import { CartService } from '../../services/cart.service';
import { of } from 'rxjs';
import { Product } from '../../models/product';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockApiService: jasmine.SpyObj<ProductApiService>;
  let mockCartService: jasmine.SpyObj<CartService>;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ProductApiService', ['getAllProducts']);
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);

    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [
        { provide: ProductApiService, useValue: apiServiceSpy },
        { provide: CartService, useValue: cartServiceSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    mockApiService = TestBed.inject(ProductApiService) as jasmine.SpyObj<ProductApiService>;
    mockCartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  it('It should create', () => {
    expect(component).toBeTruthy();
  });

  it('It should fetch products on initialization', () => {
    const mockProducts: Product[] = [
      { id: 1, title: 'Product A', price: 10, description: "prod A description", category:"clothes",image: "tshirt.png" },
      { id: 1, title: 'Product B', price: 10, description: "prod B description", category:"bags",image: "bag.png"},
    ];
    mockApiService.getAllProducts.and.returnValue(of(mockProducts));

    fixture.detectChanges();

    expect(mockApiService.getAllProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
  });

  it('It should add a product to the cart', () => {
    const mockProduct: Product = { id: 1, title: 'Product A', price: 10, description: "prod A description", category:"clothes",image: "tshirt.png" };

    component.addToCart(mockProduct);

    expect(mockCartService.addToCart).toHaveBeenCalledWith(mockProduct);
  });
});
