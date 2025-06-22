Link: https://leetcode.com/problems/guess-number-higher-or-lower/description/

**My solution**  

```cpp
/** 
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * int guess(int num);
 */

class Solution {
public:
    int guessNumber(int n) {
        int start = 1;
        int end = n;

        while (start <= end) {
            int mid = start + (end - start) / 2;

            int resultOfGuess = guess(mid);

            if (resultOfGuess == 0) {
                return mid;
            } else if (resultOfGuess == 1) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
        
        return 0;
    }
};
```

**Time complexity:** O(log N)

**Space complexity:** O(1)

This is the **optimized** solution.