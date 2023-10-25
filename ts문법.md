### 문법

변수의 자료형을 지정할 때는 id : number 이런식의 구조를 쓴다

또한 함수의 반환형도 이렇게 지정한다 getString() : string

string의 숫자를 정수로 바꾸고 싶다면

parseInt(string) 또는 +string하면 된다.

### readonly

중간에 값을 변경할 수 없는 프로퍼티

```
class Test {
  private readonly prop1: number = 1;
  private readonly prop2: number;

  constructor() {
    this.prop2 = 2;
  }

  fun() {
    this.prop1 = 3; // Error! read-only property므로 변경이 불가능
  }
}
```

### ?

프로퍼티 뒤에 ?라는 것은 필수적인 것은 아니다라는 말'

즉 없어도 작동되는데 문제가 발생하지 않는다.
