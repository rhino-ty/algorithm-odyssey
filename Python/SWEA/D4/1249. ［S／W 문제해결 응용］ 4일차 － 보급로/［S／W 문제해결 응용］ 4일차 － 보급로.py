# 기본 제공코드는 임의 수정해도 관계 없습니다. 단, 입출력 포맷 주의
# 아래 표준 입출력 예제 필요시 참고하세요.

# 표준 입력 예제
'''
a = int(input())                        정수형 변수 1개 입력 받는 예제
b, c = map(int, input().split())        정수형 변수 2개 입력 받는 예제 
d = float(input())                      실수형 변수 1개 입력 받는 예제
e, f, g = map(float, input().split())   실수형 변수 3개 입력 받는 예제
h = input()                             문자열 변수 1개 입력 받는 예제
'''

# 표준 출력 예제
'''
a, b = 6, 3
c, d, e = 1.0, 2.5, 3.4
f = "ABC"
print(a)                                정수형 변수 1개 출력하는 예제
print(b, end = " ")                     줄바꿈 하지 않고 정수형 변수와 공백을 출력하는 예제
print(c, d, e)                          실수형 변수 3개 출력하는 예제
print(f)                                문자열 1개 출력하는 예제
'''




'''
아래의 구문은 input.txt 를 read only 형식으로 연 후,
앞으로 표준 입력(키보드) 대신 input.txt 파일로부터 읽어오겠다는 의미의 코드입니다.
여러분이 작성한 코드를 테스트 할 때, 편의를 위해서 input.txt에 입력을 저장한 후,
아래 구문을 이용하면 이후 입력을 수행할 때 표준 입력 대신 파일로부터 입력을 받아올 수 있습니다.
따라서 테스트를 수행할 때에는 아래 주석을 지우고 이 구문을 사용하셔도 좋습니다.
아래 구문을 사용하기 위해서는 import sys가 필요합니다.
단, 채점을 위해 코드를 제출하실 때에는 반드시 아래 구문을 지우거나 주석 처리 하셔야 합니다.
'''

import heapq
T = int(input())

# 다익스트라: 간선의 비용으로 두고 다익스트라를 이용해 시작점에서 도착점까지의 최단 거리를 계산
# 여기서는 최소힙을 사용해 우선순위 큐를 넣어 가중치가 적은 순으로 가도록 만들면 됨
# 1. heapq 임포트 및 초기화
# 2. 시작점의 거리를 0으로 설정하고 heap에 추가
# 3. dijkstra 함수 정의
#    - heap이 빌 때까지 반복
#    - 현재 지점이 이미 방문했다면 건너뛰기
#    - 4방향 탐색하며 새로운 거리 계산
#    - 더 짧은 거리면 갱신하고 heap에 추가


for tc in range(1, T + 1):
    N = int(input())
    arr = [list(map(int, input())) for _ in range(N)]
    dist = [[float('inf')] * N for _ in range(N)]
    visit = [[0] * N for _ in range(N)]
    heap = []

    # 4방향 탐색을 위한 배열
    dr = [-1, 1, 0, 0]
    dc = [0, 0, -1, 1]

    def dijkstra(start_r, start_c):
        # 시작점 초기화: 시작점의 복구 비용도 포함
        dist[start_r][start_c] = arr[start_r][start_c]  # 보통 0
        heapq.heappush(heap, (arr[start_r][start_c], start_r, start_c))
        
        while heap:
            current_dist, r, c = heapq.heappop(heap)
            
            # 방문 체크
            if visit[r][c]:
                continue
            visit[r][c] = 1
            
            # 도착점에 도달했으면 종료 가능 (최적화)
            if r == N-1 and c == N-1:
                break
            
            # 4방향 탐색
            for i in range(4):
                nr = r + dr[i]
                nc = c + dc[i]
                
                # 범위 체크
                if 0 <= nr < N and 0 <= nc < N and not visit[nr][nc]:
                    # 새로운 거리 계산
                    new_dist = current_dist + arr[nr][nc]
                    
                    # 더 짧은 거리를 발견하면 갱신
                    if new_dist < dist[nr][nc]:
                        dist[nr][nc] = new_dist
                        heapq.heappush(heap, (new_dist, nr, nc))
    
    dijkstra(0, 0)
    print(f'#{tc} {dist[N-1][N-1]}')