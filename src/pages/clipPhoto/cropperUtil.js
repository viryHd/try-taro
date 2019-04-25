// 获取适应屏幕的图片显示大小
export const getAdjustSize = (W, H, width, height, minWidth) => {
  if (width < minWidth) {
    height *= minWidth / width;
    width = minWidth;
  }
  if (height < minWidth) {
    width *= minWidth / height;
    height = minWidth;
  }
  if (width > W) {
    height = (W / width) * height;
    width = W;
  }

  if (height > H) {
    width = (H / height) * width;
    height = H;
  }
  return {
    width: width,
    height: height
  };
};

// http://www.geeksforgeeks.org/convex-hull-set-1-jarviss-algorithm-or-wrapping/

// To find orientation of ordered triplet (p, q, r).
// The function returns following values
// 0 --> p, q and r are colinear
// 1 --> Clockwise
// 2 --> Counterclockwise
function orientation(p, q, r) {
  var val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

  if (val == 0) return 0; // collinear
  return val > 0 ? 1 : 2; // clock or counterclock wise
}

// Prints convex hull of a set of n points.
export const convexHull = (points, n) => {
  // There must be at least 3 points
  if (n < 3) return;

  // Initialize Result
  var hull = [];

  // Find the leftmost point
  var l = 0;
  for (var i = 1; i < n; i++) {
    if (points[i].x < points[l].x) {
      l = i;
    }
  }
  // Start from leftmost point, keep moving
  // counterclockwise until reach the start point
  // again. This loop runs O(h) times where h is
  // number of points in result or output.
  var p = l,
    q;
  do {
    // Add current point to result
    // Prevent duplicates object
    // if (hull.findIndex(i => i.x == points[p].x && i.y == points[p].y)==-1){
    hull.push(points[p]);
    // }

    // Search for a point 'q' such that
    // orientation(p, x, q) is counterclockwise
    // for all points 'x'. The idea is to keep
    // track of last visited most counterclock-
    // wise point in q. If any point 'i' is more
    // counterclock-wise than q, then update q.
    q = (p + 1) % n;

    for (var i = 0; i < n; i++) {
      // If i is more counterclockwise than
      // current q, then update q
      if (orientation(points[p], points[i], points[q]) == 2) q = i;
    }

    // Now q is the most counterclockwise with
    // respect to p. Set p as q for next iteration,
    // so that q is added to result 'hull'
    p = q;
  } while (p != l); // While we don't come to first
  // point

  // Print Result
  // for (var i in hull) {
  //     var temp = hull[i]
  //     console.log("(" + temp.x + ", " + temp.y + ")");
  // }
  return hull;
};

// 获取选中区域的(x, y, w, h)
export const getCropRect = convexDots => {
  console.log(convexDots);
  let maxX = 0,
    maxY = 0;
  for (let i = 0, len = convexDots.length; i < len; i++) {
    maxX = Math.max(convexDots[i].x, maxX);
    maxY = Math.max(convexDots[i].y, maxY);
  }

  let minX = maxX,
    minY = maxY;
  for (let i = 0, len = convexDots.length; i < len; i++) {
    minX = Math.min(convexDots[i].x, minX);
    minY = Math.min(convexDots[i].y, minY);
  }
  return {
    x: minX,
    y: minY,
    w: maxX - minX,
    h: maxY - minY
  };
};

