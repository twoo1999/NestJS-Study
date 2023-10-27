express 기반으로 동작

노드에서는 우리가 원하는 모든 동작을 할 수 있다 = 규칙이 없다

네스트에서는 규칙을 넣고 더 견고하게 또 쉽게 백엔드를 구축할 수 있도록한다.

준비물 nodejs, vscode, insomnia(ㅇ엔드포인트 테스트)

설치
npm install -g @nextjs/cli : 새로운 프로젝트를 생성할 수 있도록 해줌

nest new -> 프로젝트 이름 입력 후 엔터 -> npm, yarm 택 1 : 새로운 프로젝트 폴더 생성

파일 구조

```
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})

```

데코레이터 익숙해져야함

함수기능을 추가(import)하는 용도

클래스 위의 함수 클래스를 위해 사용한다고 보면 됨

### 컨트롤러

네스트어플리케이션은 main.ts로 부터 시작

AppModule : 모든 것의 루트모듈
모듈 : 어플리케이션의 일부분(한가지 역할)

컨트롤러 : url을 가져오고 함수를 실행하는 역할(express의 라우터 같은 존재)

@Get :
데코레이터
get 라우터와 같은 역할

```
@Get("/hello")
sayHello():string{
  return "Hello"
}
```

/hello를 url로 받아 밑의 sayHello를 실행

데코레이터 덕분에 가능한 일

주의 : 데코레이터와 함수는 붙어있어야한다.

```
@Get("/hello")
sayHello():string{
  return "Hello"
}
// O

@Get("/hello")

sayHello():string{
  return "Hello"
}
// x
```

> Controllers
> 컨트롤러는 들어오는 요청을 처리하고 클라이언트에 응답을 반환하는 역할을 합니다. >express의 라우터 같은 역할을 한다.
> ex) app.get("/", handleHome);
> https://docs.nestjs.com/controllers#controllers
>
> @Get()
> 라우트 핸들러(메소드) 데코레이터.
> HTTP GET 요청을 지정된 경로로 라우팅합니다.
> https://docs.nestjs.com/controllers#routing

즉 @Get("/hello") === app.get("/hello")

### service

nest에서는 컨트롤러를 비지니스 로직과 분리하기 원함

즉 컨트롤러는 그냥 url만 가져오는 역할만 수행

여기서 실행되는 function을 가지는 부분이 service

루트 모듈의 AppModule이 있고 이 AppModule에서는 우리가 하는 모든 것을 import함

컨트롤러의 역할은 단지 url을 가져오고 해당하는 function을 리턴하는 역할

서비스에서는 컨트롤러가 리턴하는 function을 담는 곳(실제 비지니스 로직을 실행)

### Rest api

cli를 사용해서 파일을 자동으로 생성해줄 수 있다.

nest g co 후 이름 입력 => 컨트롤러 생성(자세한 사항은 nest 입력 후 나오는 것을 참고 )
nest g s => 서비스 생성
심지어 import까지 같이해준다

```
@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }
}
```

여기서 @Controller('movies') 이 부분은 컨트롤러를 위한 url를 만듬 => 엔트리 포인트(진입점)를 컨트롤
즉 app.use('movies', function) 과 같은 효과

무언가 필요하다면 우리는 요청해야한다(무조건 기억)

```
 @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return 'this will return one movie';
  }
```

여기서는 우리가 parameter를 요청하는 것

id라는 파라미터를 movieId arg에 저장하고 싶다(string으로)

@Param은 url에 있는 id를 원하는 것을 nest가 알 수 있고 id로 저장해준다

주의 @Get('/:id') 의 id와 @Param('id') 의 id는 같아야한다 .

put은 모든 리소스를 업데이트
patch는 리소스의 일부를 업데이트

```
@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }
  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `this will return one movie id : ${id}`;
  }

  @Post()
  create() {
    return 'This will create new movie';
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `this will delete a movie id : ${movieId}`;
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string) {
    return `this will patch movie id:${movieId}`;
  }
}

```

method는 이런 식으로 정리해서 사용할 수 있다.

### decorater

@Body: post등의 메서드에서 body를 가져올 수 있다;

```
@Post()
create(@Body() movieData) {
  console.log(movieData);
  return 'This will create new movie';
}
```

만약 두개를 받고 싶다면

```
@Patch('/:id')
  patch(@Param('id') movieId: string, @Body() updataData) {
    return {
      updatedMovie: movieId,
      ...updataData,
    };
  }
```

,를 통해 분리해주면 된다.

@Query : ? 쿼리 스트링을 가져올 수 있다.(사용법은 @Param과 비슷)

```
 @Get('search')
  search(@Query('year') searchingYear: string) {
    return `we are searching for a moive ${searchingYear}`;
  }
```

### single-responsibility principle

하나의 module, class 혹은 function은 하나의 기능은 꼭 책임져야한다

### service

데이터베이스를 다루는 영역(Query 같은 걸 처리함)

### 기타

nest에서는 import를 사용한 추가를 잘 사용하지 않는다.
클래스의 constructor를 사용한다.

### DTO

데이터 전송 객체

프로그래머가 코드를 더 간결하게 만들어준다

들어오는 쿼리에 대해 유효성을 검사해 준다.

사용하기 위해 pipe를 사용한다.(미들웨어 느낌)

```
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
```

validationPipe를 사용하면 유효성을 검사해줄 수 있다.

그러기 위해 설치

```
npm install class-validator class-transformer
```

```
export class CreateMovieDTO {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsString({ each: true })
  readonly genres: string[];
}

```

@IsString : 들어오는 값이 string인지 검사해준다.
@IsNumber : 들어오는 값이 number인지 검사해준다.
{each:true} : 모든 요소를 하나씩 검사한다.(배열에 사용)

```
{
	"message": [
		"title must be a string",
		"year must be a number conforming to the specified constraints",
		"each value in genres must be a string"
	],
	"error": "Bad Request",
	"statusCode": 400
}
```

조건이 맞지 않다면 위와 같이 오류를 전달

옵션
whitelist : true
들어오는 데이터에서 유효하지 않는 속성을 자동으로 제거하도록 하는 옵션(보안상 이유), 도달하지 않음

forbidNonWhiteList : 이상한 값을 보내면 리퀘스트 자체를 막아버린다.

차이점 : whitelist는 없는 값을 제거해서 리퀘스트를 받는거라 몇개가 들어와도 양식에 맞는 데이터만 있으면 제대로 동작
forbid는 양식에 맞지 않는 값이 있으면 리퀘스트 자체를 거부해서 오류를 냄

```
{
	"title":"movieName",
	 "year":202,
	 "genres":["action","comic"],
	 "wrongKey": "wrongValue"
}
```

보냈을 시

```
{
	"message": [
		"property wrongKey should not exist"
	],
	"error": "Bad Request",
	"statusCode": 400
}
```

와 같이 오류가 난다/

transform:
쿼리스트링으로 들어오는 모든 값은 스트링형태 하지만 이를 사용하기 위해서 넘버로 바꿔줘야하는 상황이 발생한다면 사용'

우리가 원하는 실제 타입으로 변경

exprress에서는 이런것을 지원안함 그래서 프레임워크가 좋다

### 부분 타입

nest의 기능 중 하나

npm install @nestjs/mapped-types 설치

DTO를 변환시켜주는 기능을 가짐

```
export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {}

===

export class UpdateMovieDTO {
  @IsString()
  readonly title?: string;

  @IsNumber()
  readonly year?: number;

  @IsString({ each: true })
  readonly genres?: string[];
}

```

똑같은 기능을 가짐

모든 프로퍼티를 옵셔널하게 줄 수 있다.

### di

컨트롤러를 보면 getAll()을 사용함

위에서 무비서비스라 불리는 프로퍼티를 만들고 타입을 지정
타입스크립트가 아니었다면 불가능함

### res, req

컨트롤러에서 res, req에 접근하고 싶다면 @Req(), @Res()사용
하지만 직접적으로 사용하는건 추천안함

네스트는 두개의 프레임워크를 사용 그래서 사용하지 않는갓이 좋다.

### spec

spec은 테스트를 포함하는 파일
movie.controller를 테스트하고 싶다면 해당하는 spec.ts를 사용

jest가 speㅊvkdl을 찾을 수 있도록 설정되어있음

유닛 테스팅 : 하나의 func만 따로 테스트
서비스에서 붆리된 유닛

endtoend테스트 : 모든 시스템을 테스팅(e2e)
특정 페이지로 가면 특정 페이지가 나와야하는 상황에서 사용
사용자 스토리 사용자 관점에서 보기
링크를 클릭하면 다른 페이지로 가는 스토리를 테스트

### 유닉 테스트

디스크라이브: 테스트를 묘서

beforeEach 테스트를 실행하기 전에 실행

individual test

it("정의", ()=>{

})

### DTO와 unity

unity

실제 DB테이블과 맵핑되는 클래스
테이블이 가지지 않는 컬럼을 필드로 가져서는 안된다.
엔티티는 데이터의 영속성을 위해 사용되는 객체, 요청이나 응답 값을 전달하는 객체로 사용되는 것은 좋지 않ㅈ다.

또한 setter를 지양한다.
객체의 일관성, 안전성을 보장할 수 없기 때문

DTO
계층간 데이터 교환이 이루어질 수 있도록 하는 객체

getter, setter를 포함ㅅ하며 이 외의 비지니스 로직은 포함하지 않느다./

### controller

컨트롤러는 애플리케이션에 대한 특정 요청을 수신한다는 것

라우팅 메커니즘은 컨트롤러가 어떤 요청을 수신하는지 제어 -> 서로 다른 요청에 대해서 서로 다른 작업을 수행할 수 있도록 함

컨트롤러를 사용하기 위해 클래스와 데코레이터를 사용

데코레이터는 클래스를 필수 메타데이터와 연결하고 nest가 라우팅 맵을 생성할 수 있도록 합니다.(요청을 해당 컨트롤러에 연결)

### 라우팅

```
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

cats : prefix
경로 접두사를 사용하면 경로 집합을 쉽게 그룹화하고 반복 코드를 최소화 할 수 있음

즉 cats에 관련된 모든 코드를 그룹화해서 사용할 수 있다.

fineAll 위의 @Get은 네스트가 특정 엔드포인트의 핸들러를 등록할 수 있도록 함
@get : http요청 데코레이터

컨트롤러 데코레이터의 prefix, http요청 데코레이터의 path를 합쳐 엔드포인트를 만들고 여기에 핸들러 함수를 바로 밑에 등록합니다

위의 경우에는 GET /cats 로 들어오는 요청에 findAll 함수를 실행할 수 있도록 등록한 경우

네스트가 응답을 조작하기 위한 방법은 두가지

- 표준(권장)
- 라이브러리 별

표준

내장 메소드를 사용하면 요청 핸들러가 js객체 또는 배열을 반환할 때 JSON으로 직렬화

그러나 기본 유형을 반환(string, number, boolean)을 반환하는 경우 네스트는 직렬화를 하지 않고 값만 보냄 그러므로 더 간단하게 처리할 수 있음

라이브러리 별
라이브러리 별 응답 객체를 사용할 수 있음
해당 개체에 노출된 기본 응답 처리 메서드를 사용할 수 있음

요청 객체
위에서 등록한 핸들러는 클라이언트의 요청을 파악하는 경우가 생길 수 있다.

네스트에서는 요청에 대해 액세스할 수 있도록 요청 객체 액세스를 지원

| 데코레이터              | express                         |
| ----------------------- | ------------------------------- |
| @Request() / @Req()     | req                             |
| @Response() / @Res()    | res                             |
| @Next()                 | next                            |
| @Session()              | req.session                     |
| @Param(key?: string)    | req.params / req.params[key]    |
| @Body(key?: string)     | req.body / req.body[key]        |
| @Query(key?: string)    | req.query / req.query[key]      |
| @Headers(name?: string) | req.headers / req.headers[name] |
| @Ip()                   | req.ip                          |
| @HostParam()            | req.hosts                       |

### 와일드카드 라우팅

패턴 기반 라우트 설정도 지원

와일드카드 패턴을 이용해서 해당 문자 패턴과 일치 시 엔드포인트에 접근할 수 있도록함

```
@Get('wild*')
  wildcardRoute() {
    return 'wildcard Test';
  }
```

### 상태코드

응답 상태 코드는 201 created를 제외하고는 기본적으로 200
핸들러 수준에서ㅗ 변경하고 싶다면 @HttpCode()를 사용

```
// 기존
@Get('status')
statusTest() {
  return 'this is status test';
}

//HttpCode 사용
@Get('status')
@HttpCode(201)
statusTest() {
  return 'this is status test';
}

```

기존에는 200 전달

사용 시 201 전달

```
@Post()
  create(@Res() res: Response) {
    try {
      res.status(204).send('This action adds a new cat');
    } catch (error) {
      // 예외가 발생하면 에러 응답
      res.status(404).send();
    }
  }
```

### 헤더

헤더를 설정하는데 사용

```
@Get('header')
@Header('custom', 'header')
headerTest(): Object {
  return { message: 'header Test' };
}
```

### redirect

redirect 하고 싶다면 @Redirect를 통해 할 수 있습니다.
@Redirect 내부에 설정해줘도 되고 상황에 따라 다르게 하고 싶다면 url을 직접 설정해줘도 좋습니다.

```
@Get('redirect')
@Redirect('https://www.naver.com', 302)
redirectTest() {
  return;
}

@Get('redirect')
@Redirect()
redirectTest() {
  return { url: 'https://www.naver.com' };
}
```

### Sub-Domain Routing

요청의 호스트를 비교해서 특정 값과 일치했을 때 라우트 처리를 할 수 있도록 해줍니다.

```
@Controller({ host: 'admin.example.com' })
export class AdminController {
  @Get('test')
  index(): string {
    return 'Admin page';
  }
}
```

지정된 호스트(admin.example.com)에서만 동작할 수 있도록 처리

# 공급자

### provider

provider는 NestJS의 기본개념입니다.

services, repositories, factories, helpers 등이 모두 provider로 취급됩니다.

provider의 주요 아이디어는 종속성, 주입이 될 수 있다라는 것입니다.

provider는 객체로 하여금 서로 다양한 관계를 새성할 수 있게 해주며 이러한 객체를 연결하는 기능을 Nest 런타임 시스템에 위임할 수 있도록 해줍니다.

### service

이전 챕터에서 사용한 catscontroller를 사용해서 service를 제작

```
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
```

```
export interface Cat {
  name: string;
  age: number;
  breed: string;
}

```

service를 만들기 위해서는 nest g s name을 사용하면 쉽게 사용할 수 있습니다.(완전 자동)

위의 CatService는 하나의 프로퍼티를 가지고 2개의 메서드를 가지는 기본 클래스입니다.

다만 다른 점은 @Injectable을 사용한다는 것 입니다.

@Injectable은 CatService가 IoC 컨테이너에 의해 관리받는 클래스라는 것을 메타데이터에 선언합니다.

```
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  ... 중략
}
```

클래스의 constructor에 의해 주입이 되고 이를 constructor 기반 주입이라고 합니다.

private를 사용하는 것을 기억해야 합니다.

이 짧은 구문을 통해 동일한 위치에서 즉시 서비스를 선언하고 초기화해줄 수 있습니다.

근데 왜 클래스의 인스턴스를 만들지 않고 사용할까? -> IoC 때문

### IoC(Inversion of Control)

제어 역전을 의미합니다.

기존 개발자는 클래스를 생성하고 new를 통해 인스턴스를 생성하는 과정을 거쳤습니다.

그러나 이러한 점은 개발자가 매우 귀찮음을 느끼게 되는 원인이었습니다.

그래서 IoC 컨테이너는 provider의 메타데이터를 분석하고 의존성 그래프를 생성하게 되는데 이때 사용하는 것이 @Injectable입니다.

생성한 의존성 그래프를 통해 필요할 때 마다 인스턴스를 알아서 생성하고 생성과 관리를 개발자가 아닌 프레임워크가 알아서 해주기 때문에 제어 역전이라는 말을 사용합니다.

즉 개발자가 관리하던 클래스를 더 이상 관리하지 않고 프로그램에 넘기게 되는 것입니다.

### Dependency injection

의존성 주입이라고 알려진 강력한 디자인 패턴을 사용해서 만들어졌습니다.

시간이 있다면 Angular 공식문서(https://angular.io/guide/dependency-injection)를 참고해서 이 컨셉을 잘 이해하는 것을 추천합니다.

NestJS에서는 타입스크립트의 타입을 지정하는 특성 덕분에 쉽게 의존성을 관리할 수 있습니다.

밑의 예시에서는 catSerivce의 객체를 생성하고 리턴함으로써 catService를 결정합니다.
또한 싱글톤의 경우에는 다른 곳에서 이미 반환이 됐을 경우 기존에 존재하는 인스턴스를 반환합니다.

즉 타입스크립트의 강력한 타입 시스템을 통해 코드내에서 종속성을 쉽게 관리할 수 있겠됩니다.

```
constructor(private catsService: CatsService) {}
```

### scope

공급자는 애플리케이션의 라이프 사이클과 동기화된 라이프타임(스코프)를 가집니다.

그래서 애플리케이션이 부트스트랩되면 모든 의존성이 결정되고 비슷하게 애플리케이션이 종료될 때 각각의 공급자도 끝납니다.

이러한 공급자의 라이프 타임을 조절할 수 있는데 자세한 사항은 injection scope를 참고합니다.

-> 공부해봤는데 이렇다할 예시가 없었습니다...

### custom providers

NestJS는 내장 IoC를 가지고 있고 이는 공급자 간의 관계를 결정합니다.

이 특정은 위에서 설명한 의존성 주입의 특징에 기반합니다. 하지만 설명한 것 보다 공급자는 더욱 강력한데 우리가 원하는 custom provider를 생성할 수 있습니다.

### optional providers

때때로 필수적이지 않는 의존성을 가질 수도 있습니다.

예를 들어 클래스는 설정 객체에 의존적이지만 아무것도 전달되지 않았을 때 기본값을 사용할 수도 있습니다.

이러한 경우에서 의존성은 선택적이게 됩니다. 설정 공급자가 없어도 오류가 나지 않기 때문입니다.

선택적 공급자를 지정하기 위해 @Optional()을 사용

```
import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
}
```

이 예시에서 커스텀 공급자를 사용하고 있음 HTTP_OPTION이라는 커스텀 토큰을 포함한 이유입니다.

이전 예시에서는 생성자 기반 인젝션(constructor-based injection)을 사용하여 종속성을 클래스의 생성자를 통해 나타냈습니다.

### Property-based injection

위에서 사용한 방법은 생성자 기반 주입니다.

매우 특별한 경우에 한해서 property 기반 주입이 사용될 수 있다.

예를 들어 최상의 클래스가 하나 또는 여러개의 공급자에 의존하고 있다면 하위 클래스에서 super()를 컨스트럭터에서 사용하는 것은 매우 번거러울 것입니다.

그래서 @Inject() 데코레이터를 프로퍼티레벨에서 사용합니다.

### Provider registration

```
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
```

### modules

모듈은 @Module 데코레이터가 주석으로 달린 클래스

@Module는 애플리케이션의 구조를 구성하기 위한 메타데이터를 제공한다.

각 애플리케이션에는 적어도 하나 이상의 모듈이 있고 이는 루트 모듈이라고 한다. 루트 모듈은 네스트가 애플리케이션 그래프를 만드는데 사용하는 시작점이다.

애플리케이션 그래프 : 모듈, privider 관계 그리고 종속성을 해결하는데 사용하는 내부 데이터 구조

정말 작은 애플리케이션이 단 하나의 모듈을 가지는 경우도 있지만 이는 흔한 일이 아니다.

모듈은 컴포넌트를 구조화하는데 매우 효과적으로 사용된다.

그래서 많은 애플리케이션이 결과 구조는 밀접하게 연관된 기능들을 캡슐화하도록하고 이를 모듈로 만들어 사용한다.

![Alt text](image.png)

즉 모듈은 코드를 구조화하고 유지보수할 수 있도록 하는 기능을 가진다.

module의 속성

providers : nest에의해 인스턴스화되고 이 모듈 내에서 공유됩니다.
controllers : 인스턴스화되어야하는 이 모듈에서 정의된 컨트롤러의 모음
imports : 이 모듈에서 필요한 provider를 export한 모듈의 모음
exports ;현재 모듈에서 다른 모듈에서 사용할 수 있도록 공개해야 하는 공급자의 일부를 정의합니다.

모듈은 캡슐화됩니다. 즉 현재 모듈에 직접 속하지 않거나 가져온 모듈에서 내보내지 않은 provider를 주입하지 못한다는 것이다. 따라서 모듈에서 노출한 프로바이더를 모듈의 공용 인터페이스 또는 API로 간주할 수 있습니다.

```
@Module({
  imports: [MoviesModule, TestModule],
  controllers: [AppController, TestController],
  providers: [],
})
```

### Feature modules(기능 모듈?)

예제에서 만든 CatController와 CatService는 똑같이 cat을 다룸

그래서 하나의 기능 모듈에 묶는 것이 합리적임

기능 모듈은 특징으로 코드를 구조화하ㅗ 바운더리를 구축합니다.

복잡한 구조를 다룰 수 있도록 한다. solid 원칙과 함께 애플리케이션 또는 팀의 규모가 커짐에 따라

```
@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}

```

이렇게 기능 모듈을 만들고 이를 루트 모듈(app.module)에 넣어주면 끝이다

```

@Module({
  imports: [CatsModule],
})
export class AppModule {}

```

### Shared modules

네스트에서는 모듈이 싱글톤으로 관리됩니다. 그래서 여러개의 모듈에서의 인스턴스를 간단하게 공유할 수 있습니다.

![Alt text](image-1.png)

모든 모듈은 자동적으로 공유 모듈이다 그래서 한 번 만들면 다시 사용할 수 있다.
그래서 Catservice를 module 의 exports 배열에 추가함으로써 우리는 이 인스턴스를 공유할 수 있다.

```

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], // 추가
})
export class CatsModule {}

```

이제부터 CatModule을 추가한 모든 모듈에서는 CatService의 똑같은 인스턴스를 사용할 수 있다.(import 시)

### Module re-exporting

모듈 내부의 provider을 export하는 것 뿐만 아니라 import한 provider를 다시 export할 수 있습니다.

```
@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
```

여기에서 CommonModule은 CoreModule로 부터 import됨과 동시에 export 됩니다.

그래서 CoreModule을 가져오는 다른 모듈에서도 CommonModule을 사용할 수 있습ㄴ디ㅏ.

### Dependency Injection

모듈 클래스는 provider를 주입할 수 있습니다(설정 목적)

그러나 모듈 클래스를 provider로 주입할 순 없습니다( 순환 종속성)

순환 종속성 : 서로를 필요할 때 생김
a는 b가 필요하고 b는 a가 필요함 이건 피해야하지만 2가지 방법으로 해결가능

### Global modules

만약에 같은 모듈을 모든 곳에서 import해야한다고 했을 때 import하는 것은 매우 번거롭습니다.

앵글러에서는 provider가 전역 범위에서 등록이 됩니다. 그래서 한번 선언하면 어디에서나 사용이 가능합니다.

그러나 네스트에서는 모듈 스코프상에서 캡슐화가 되기 때문에 import하지 않는 한 사용할 수 없습니다.

그래서 만약에 전역에서 사용하는 provider가 필요한 경우(ex helper, database connection 등) @Global 데코레이터를 통해 글로벌 모듈로 사용이 가능합니다.

```
import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

전역모듈은 루트 모듈에 의해 한 번만 등록되어야합니다,. CatsService는 어디에서나 사용가능하며 CatService를 사용하고자 하는 모둘은 import할 필요없습니다.

그러나 전역변수를 많이 사용하면 안 좋은 것 처럼 전역 모듈은 그리 좋은 디자인은 아닙니다. 모듈의 import에 넣는 것이 일반적으로 선호되는 방법입니다.

### Dynamic modules

네스트는 다이나믹 모듈이라는 강력한 특징을 가집니다.

프로바이더를 동적으로 등록하고 설정할 수 있는 커스텀 모듈을 쉽게 생성할 수 있습니다.

```
import { Module, DynamicModule } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';

@Module({
  providers: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
```

이 모듈은 기본적으로 Connection 프로바이더를 정의하지만(@Module() 데코레이터 메타데이터), forRoot()(이름은 자유) 메서드에 전달된 entities, options 객체에 따라 repository와 같은 여러 프로바이더를 export 합니다. 동적 모듈이 반환하는 속성은 @Module() 데코레이터에 정의된 모듈의 기본적인 메타데이터를 재정의(override)하지 않고 확장합니다. 이렇게하면 정적으로 선언된 연결 제공자와 동적으로 생성된 저장소 제공자가 모두 모듈에서 내보내집니다.

```
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [DatabaseModule.forRoot([User])],
})
export class AppModule {}
```

```
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [DatabaseModule.forRoot([User])],
  exports: [DatabaseModule],
})
export class AppModule {}
```

### Middleware

#### 미들웨어의 역할

라우트 함수가 실행되기 전 실행됨

#### 요청 및 응답

요청과 응답 객체에 접근할 수 있다.

#### next 미들웨어

요청 응답 사이클에서 next 미들웨어 함수에 접근할 수 있다. 보통 next 라는 변수에 할당된다./

즉 미들웨어는 웹 애플리케이션의 유연성과 모듈화를 높여주며 요청 처리 및 응답 구성에 대한 커스텀 로직을 쉽게 추가할 수 있도록 도와준다.

![Alt text](image-2.png)

네스트의 미들웨어는 기본적으로 익스프레스의 미들웨어랑 같으며 밑의 익스프레스 공식 문서의 설명이 미들웨어의 기능을 설명한다.

> 미들웨어는 다음과 같은 동작을 합니다.
>
> - 어떠한 코드도 실행한다.
>   - 요청과 으답 처리를 위한 사용자 정의 로직을 구현할 수 있다.
> - 응답 및 요청 객체에 대한 변화를 수행한다.
>   - 요청 및 응답 데이터를 가공하거나 수정할 수 있다.
> - 응답 - 요청 사이클을 종료한다.
>   - 미들웨어가 함수를 처리하고 응답을 클라이언트에 반황한 후 발생
>   - 더 이상 미들웨어 함수나 라우트 핸들러를 실행하지 않고 종료
> - next 함수를 호출한다.
>   - 미들웨어 함수가 사이클을 종료하지 않는다면 next() 함수를 호출한다.
>   - 사이클이 종료되지 않았는데 next()를 호출하지 않는다면 요청이 처리되지 않고 남아 있게 된다.

네스트에서 커스텀 미들웨어를 만들고 싶다면 함수 혹은 @Injectable데코레이터를 사용한 class 등을 사용할 수 있습니다.

class는 NestMiddleware interface를 implement해야하는 반면 함수는 특별한 요구사항이 없습니다,

```
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...', req.method);
    next();
  }
}

```

![Alt text](image-3.png)

### Dependency injection

네스트 미들웨어는 의존성 주입을 지원합니다. 미들웨어도 동일한 모듈 내에서 사용 가능한 의존성을 주입할 수 있습니다.

### Applying middleware

Module안에는 미들웨어를 추가하는 공간이 없다. 그래서 configure를 통해서 추가한다.

미들웨어를 추가하는 모듈은 NestModule 인터페이스를 추가해야한다.

```
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
  }
}
```

로거 미들웨어를 설정하는 방법입니다.미들웨어를 특정 요청에 제한하는 것도 가능하다.

consumer를 통해 미들웨어를 등록하는데 등록하는 순서대로 차례로 실행되고 모든 미들웨어가 실행됐다면 라우터 핸들러를 실행한다.

```
@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('cats');
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats/:id', method: RequestMethod.GET });
  }
}
```

- configure ㅇ메서드는 async를 사용할 수 있다 즉 내부에서 행해지는 모든 것ㄷ들의 완수까지 기다릴 수 있다. 이는 데이터베이스의 설정 정보를 가져오는 등의 방식으로 사용가능하다.

```
@Module({})
export class AppModule {
  constructor(private configService: ConfigService) {}

  async configure(consumer: MiddlewareConsumer) {
    // 외부 데이터베이스에서 설정 정보를 가져옴
    const settings = await this.configService.fetchSettings();

    // 미들웨어 등록
    consumer.apply(MyMiddleware).forRoutes('example');
  }
}
```

주의

익스프레스 어댑터를 사용할 때 네스트는 기본적으로 바디 파서 패키지를 통해 json, urlencoded를 등록한다. 만약 이 미들웨어를 변경하고 싶다면 바디 파서를 비활성화해야한다.

```
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // 기본 body-parser 미들웨어의 전역 등록 비활성화
  });
  await app.listen(3000);
}
bootstrap();
```

### Route wildcars

```
forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
```

위와 같이 path를 지정하고 싶을 때 와일드카드 패턴을 사용할 수 있다.

### middleware consumer

컨슈머는 헬퍼 클래스다.

미들웨어를 관리하기 위한 빌트인 기능을 가지고 있다.

유연한 스타일로 체이닝 가능하다.

forRoutes() 메서드는 string한개, 여러개의 스트링, RouteInfo 객체, 컨트롤러 클래스 심지어는 여러개의 컨트롤러 클래스를 받을 수 있다.

근데 대부분의 경우에는 , 로 구분된 클래스들을 많이 사용할 것이다.

밑에는 하나의 컨트롤러만 전달했을 때다.

```
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(CatsController);
  }
}
```

추가

apply() 함수도 하나의 미들웨어 또는 여러개의 미들웨어를 등록할 수 있습니다.

```
consumer.apply(Middleware1, Middleware2, Middleware3).forRoutes('example');
```

### Excluding routes

적용된 미들웨어에서 특정 route를 빼고 싶다면 exclude() 메서드를 사용해서 쉽게 제외해줄 수 있다.

exclude 또한 하나의 문자열, 여러개의 문자열, 객체를 지정할 수 있다.

```
consumer
  .apply(LoggerMiddleware)
  .exclude(
    { path: 'cats', method: RequestMethod.GET },
    { path: 'cats', method: RequestMethod.POST },
    'cats/(.*)',
  )
  .forRoutes(CatsController);
```

또한 와이드카드패턴도 지원한다.

### Functional middleware

위의 예시는 매우 심플함

맴버도 없고 추가적은 메소ㅓ드도 없고 종속성도 ㅇ없다.

우리는 클래스 대신 함수를 사용해서 미들웨어를 구현할 수 있는데 이를 functional middleware라고 한다.

```
import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
};
```

```
consumer
  .apply(logger)
  .forRoutes(CatsController);
```

힌트

미들웨어가 아무런 종속성을 가지지 않는다면 간단하게 펀셔널 미들웨어를 사용하는 것을 고려하자

### Multiple middleware

미들웨어를 순차적으로 여러개 실행하고 싶다면 apply에 여러개의 미들웨어를 추가하자

```
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);

```

### Global middleware

모든 경로에 한번에 미들웨어를 적용하고 싶다면 전역 미들웨어를 사용하자

```
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```

### Exception filter

네스트는 내장 예외 레이어를 가지는데 이것은 애플리케이션에 걸쳐 처리되지 않는 예외를 다루는 역할을 한다.

애플리케이션에서 예외처리가 됐다면 그 것은 이 레이어에서 발생이 되고 적절한 유저 친화적 reponse를 보낸다.

별도의 설치없이 이 동작은 내장 전역 예외 필터에의해 동작되고 HttpException타입의 예외를 처리한다.

에외가 인식되지 않았을 때(HttpException이 아니거나 HttpException을 상속받은 클래스가 아닐 때) 내장 예외 필터는 밑의 응답을 생성합니다.

```
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

힌트
글로벌 예외 필터는 http-errors라이브러리를 부분적으로 지원합니다.

기본적으로 statuscode 및 message 속성을 포함하는 모든 발생한 에외는 정확하게 처리되고 응답으로 전송합니다.

### Throwing standard exceptions

네스트는 내장 httpexceoption 클래스를 제공합니다. 특정 REST/GraphQL API를 기반으로 하는 애플리케이션의 경우 에러가 발생했을 시
표준 HTTP 응답 객체를 보내는 것이 가장 좋은 방법이다.

예를 들어 CatsController에서 에러를 하드코딩으로 발생시키는 상황이다

```
@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```

```
{
  "statusCode": 403,
  "message": "Forbidden"
}
```

HttpException 은 2개의 매개변수를 전달 받는데 이는 응답을 결정한다.

- reponse 매개변수는 JSON 응답 body를 결정한다. string, object일 수 있다.
- status 매개변수는 status code를 결정한다.

기본적으로 바디는 두개의 요소를 포함한다.

- statusCode : status 매개변수에 의해 결정되는 부분
- message : status에 기반한 짧은 메세지

제이슨 응답 바디의 메세지 부분을 오버라이딩하고 싶다면 reponse 매개변수에 string을 제공한다.
제이슨 응답 바디의 전체적인 부분을 오버라이딩하고 싶다면 reponjse 매개변수에 객체를 전달한다.
네스트는 객체를 직렬화시키고 제이슨 reposne 바디로 반환한다.

두번째 매개변수인 status 유효한 http 상태 코드여야한다.
네스트에서 정의된 열거형을 사용하는 것이 베스트다

3번쨰 매개변수가 있는데 선택이다.

- options
  에러 원인를 제공하기 위해 사용
  이 원인 객체는 직렬화되지 않는다. 응답 객체 안에서
  로깅 목적으로 사용한다.http 예외가 발생됐을 때 내부 에러에 대한 정보를 제공하기 위해

```
@Get()
async findAll() {
  try {
    await this.service.findAll()
  } catch (error) {
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'This is a custom message',
    }, HttpStatus.FORBIDDEN, {
      cause: error
    });
  }
}
```

```
{
  "status": 403,
  "error": "This is a custom message"
}

```

### Custom exceptions

많은 경우에서 커스텀 예외 처리가 필요없거나 내장 예외 처리를 할 수 있습니다. 그러나 만약 커스텀 예외처리가 필요하다면 HttpException 클래스를 상속하는 커스텀 예외 계층 구조를 가지는 것도 좋습니다.

이러한 접근과 함께 네스트가 커스텀 예외처리를 인식할 수 있고 자동적으로 에러 응답을 처리할 수 있다.

```
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
```

### Built-in HTTP exceptions

참고

https://docs.nestjs.com/exception-filters

```
throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
```

```
{
  "message": "Something bad happened",
  "error": "Some error description",
  "statusCode": 400,
}

```

### Exception filters

대부분의 내장 예외 필터가 자동적으로 많은 경우를 커버하지만 예외 레이어를 전체적으로 컨트롤하고 싶을 수 도 있다.

예를 들어 로깅시스템을 추가하고 싶을 수도 있고, 동적인 요인에 따라 다른 json 스키마를 사용하고 싶은 경우도 있다.

예외 필터는 이러한 경우를 위해 만들어졌다.

예외 필터는 특정 컨트롤 플로우를 제어할 수 있도록 해주고 또한, 클라이언트로의 응답에 대한 내용을 제어할 수 있도록 한다.

HttpException클래스의 인스턴스인 예외를 잡는 기능을 가진 예외 필터를 만들자, 그리고 커스텀 응답 로직을 추가하자

이걸 위해 응답, 요청의 기반하는 플랫폼에 접근해야한다.

우리는 요청 객체에 접근하고 그래서 우리는 오리지날 url을 가져올 수 있다. 또한 로깅 정보에 이 url을 추가할 수 있다.

response.json() 메서드를 사용해서 보내지는 응답 객체에 대해 직접적인 제어를 할 수 있도록 응답 객체를 사용한다.

```
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
```

힌트
모든 예외 필터는 generic ExceptionFilter<T> 인터페이스를 포함합니다.

이것은 지정된 타입과 함께 catch 메서드를 제공할 수 있도록 합니다.

catch 데코레이터는 예외 필터와 필요한 메타데이터를 bind해줍니다. 그리고 네스트에게 이 특정한 필터는 HttpException 타입의 예외만 감시하고 나머지는 안한다는 말입니다.

catch는 하나의 매개변수 혹은 ,로 구분된 리스트를 받을 수 있다. 이것은 여러 타입의 예외를 한번에 셋업할 수 있도록 해준다.

### Argument host

catch의 파라미터를 보면

exception 매개변수는 현재 처리중인 옝되 객체입니다.

host는 ArgumentHost의 객체입니다,

이것은 매우 강력한 유틸리티 객체 입니다. 추후 execution context chapter에서 설명

이 샘플에서 보면

우리는 오리지널 요청 핸들러(예외가 발생한)에 전달되는 요청, 응답 객체에 대한 참조를 포함하기 위해 사용합니다.

예제에서는 원하는 요청 및 응답 객체를 얻기 위해 argumenthost의 헬퍼 메서드를 사용햇따,.

더욱 자세한건 argumenthost를 참고

이 추상화 수준의 이유는 모든 컨텍스트에서 작동하기 때문

실행 컨텍스트 챕터에서는 host와 그 도우미 함수ㅡ의 능력을 활용해 모든 실행 컨테긋트에 대한 적절한 액세스 방법을 본다.

ArgumentsHost와 그 도우미 함수의 추상화 수준은 다양한 실행 컨텍스트에서 예외 처리를 일반화하고 코드의 재사용성을 높이기 위해 사용됩니다. 예를 들어, HTTP 서버, Microservices, WebSockets와 같은 다양한 컨텍스트에서 예외를 처리할 때 동일한 패턴을 사용할 수 있게 해줍니다. 이것은 Nest.js에서 예외 필터를 작성할 때 코드를 표준화하고 보다 유연한 방식으로 다양한 실행 환경에서 동작하게 할 수 있습니다.

chatgpt

### binding filters

```
@Post()
@UseFilters(new HttpExceptionFilter())
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}
```

catch와 비슷하게 하나 이상의 필터 인스턴스를 받을 수 있다,.

또한 인스턴스를 직접 생성하는 것이 아닌 클래스를 전달하고 의존성을 주입하는 방법도 있다.

클래스 -> 의존성 주입을 자동으로 처리
인스턴스 -> 요청 간 완벽한 분리를 원할 때 사용 격리된 필터동작

하나의 메서드가 아닌 범위를 다르게 하고 싶다면 아래와 같이

```
@UseFilters(new HttpExceptionFilter())
export class CatsController {}
```

글로벌 선언

```
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
```

다만 전역 필터는 의존성 주입이 안되는 데 이는 밑과 같이 해결 가능

```
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
```

이 방법을 사용하여 필터에 대한 의존성 주입을 수행할 때, 이 구성을 사용하는 모듈의 종류와 관계없이 실제로 필터는 전역적으로 동작합니다. 즉, 필터가 어느 모듈에서 사용되는지와 관계없이 애플리케이션 전체에 적용되는 전역 필터로 작동합니다.

따라서 이 구성은 필터를 정의한 모듈에서 수행하는 것이 일반적입니다. 필터가 정의된 모듈에서 필터를 등록하고 의존성을 설정하면 필터가 전역 범위에서 모든 컨트롤러와 라우트 핸들러에서 사용될 수 있게 됩니다.

### Catch everything

모든 다루지 않는 모든 예외를 캐치하고 싶다면 catch() 빈 상태ㄹ 둬라

import {
ExceptionFilter,
Catch,
ArgumentsHost,
HttpException,
HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

catch(exception: unknown, host: ArgumentsHost): void {
// In certain situations `httpAdapter` might not be available in the
// constructor method, thus we should resolve it here.
const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);

}
}
아래의 예시 코드에서는 HTTP 어댑터를 사용하여 응답을 처리하므로, 플랫폼에 독립적입니다. 이 코드에서는 플랫폼 특정 객체 (Request 및 Response)를 직접 사용하지 않고 HTTP 어댑터를 통해 응답을 처리하므로 어떤 플랫폼에서든 동일한 방식으로 동작할 수 있습니다.

일반적으로, 애플리케이션 요구사항을 충족시키기 위해 완전히 사용자 정의된 예외 필터를 생성할 것입니다. 그러나 특정한 상황에 기반하여 행동을 재정의하고자 할 때 내장된 기본 전역 예외 필터를 확장하고 싶을 수 있는 경우도 있습니다.

내장된 기본 필터로 예외 처리를 위임하려면 BaseExceptionFilter를 확장하고 상속된 catch() 메서드를 호출해야 합니다. 이렇게 하면 예외 처리를 내장 필터에 위임할 수 있습니다.

예를 들어, 모든 종류의 예외를 처리하는 AllExceptionsFilter를 생성하고 BaseExceptionFilter를 확장한 경우:

javascript
Copy code
import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
catch(exception: unknown, host: ArgumentsHost) {
super.catch(exception, host);
}
}
Global 범위의 필터는 기본 필터를 확장할 수 있으며, 이는 두 가지 방법으로 수행할 수 있습니다.

첫 번째 방법은 사용자 정의 글로벌 필터를 인스턴스화할 때 HttpAdapter 참조를 주입하는 것입니다:

javascript
Copy code
async function bootstrap() {
const app = await NestFactory.create(AppModule);

const { httpAdapter } = app.get(HttpAdapterHost);
app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

await app.listen(3000);
}
bootstrap();
두 번째 방법은 APP_FILTER 토큰을 사용하는 것입니다.

APP_FILTER는 Nest.js에서 사용되는 특수한 프로바이더 토큰(token) 중 하나입니다. 이 토큰을 사용하여 애플리케이션 레벨에서 예외 필터(Exception Filter)를 등록할 수 있습니다.

예외 필터는 예외가 발생했을 때 처리하고 사용자 정의된 응답을 생성하는 데 사용됩니다. APP_FILTER 토큰을 사용하여 이러한 예외 필터를 애플리케이션 전역 레벨에서 설정할 수 있습니다. 이렇게 설정한 필터는 애플리케이션의 모든 컨트롤러와 라우트 핸들러에서 발생하는 예외를 처리합니다.

일반적으로 APP_FILTER를 사용하여 전역 예외 필터를 설정하고, 필터 클래스를 해당 토큰과 연결시킵니다. 이렇게 하면 애플리케이션에서 발생하는 모든 예외에 대한 일관된 처리를 구현할 수 있습니다.

예를 들어:

javascript
Copy code
@Module({
providers: [
{
provide: APP_FILTER,
useClass: MyExceptionFilter,
},
],
})
export class AppModule {}
위 코드에서는 APP_FILTER 토큰을 사용하여 MyExceptionFilter 클래스를 애플리케이션의 예외 필터로 등록하고 있습니다. 이렇게 하면 MyExceptionFilter 클래스가 애플리케이션의 모든 예외를 처리하는 전역 예외 필터로 동작합니다.
