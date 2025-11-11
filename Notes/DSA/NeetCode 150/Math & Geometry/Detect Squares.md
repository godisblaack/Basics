Link: https://leetcode.com/problems/detect-squares/description/

I was not able to solve it.

**Hash Map**

```cpp
class DetectSquares {
    unordered_map<int, unordered_map<int, int>> ptsCount;

public:
    DetectSquares() {}

    void add(vector<int> point) {
        ptsCount[point[0]][point[1]]++;
    }

    int count(vector<int> point) {
        int res = 0;
        int x1 = point[0], y1 = point[1];

        for (auto &[y2, cnt] : ptsCount[x1]) {
            int side = y2 - y1;
            if (side == 0) continue;

            int x3 = x1 + side, x4 = x1 - side;
            res += cnt * ptsCount[x3][y1] * ptsCount[x3][y2];
            res += cnt * ptsCount[x4][y1] * ptsCount[x4][y2];
        }

        return res;
    }
};

/**
 * Your DetectSquares object will be instantiated and called as such:
 * DetectSquares* obj = new DetectSquares();
 * obj->add(point);
 * int param_2 = obj->count(point);
 */
```

**Time complexity:** O(n), where O(1) for add() and O(n) for count().

**Space complexity:** O(n)