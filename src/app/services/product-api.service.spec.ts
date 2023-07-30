import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductApiService } from './product-api.service';

describe('ApiService', () => {
  let service: ProductApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('It should fetch products using HttpClient', () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Product 1',
        price: 10,
        description: 'test des',
        category: 'test category',
        image: 'image test',
      },
      {
        id: 2,
        title: 'Product 2',
        price: 20,
        description: 'test des',
        category: 'test category',
        image: 'image test',
      },
    ];

    service.getAllProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne(
      'https://fakestoreapi.com/products'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockProducts);
  });
});
