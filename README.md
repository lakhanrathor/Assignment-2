# Assignment-2
<h2> LDU Factorisation </h2>
<p>LDU Factoraisation is a matrix decompositaion technique where a given square matrix A isb decomposed into tree components</p>
<ul>
  <li> L: A lower traungular matrix</li>
  <li> D: A diagonal matrix</li>
  <li> U: An Upper traingular matrix</li>
</ul>
<p> LDU Factorisation is useful in several areas of numerical analysis and linear algebra </p>
<ul>
  <li>Solving Linear Systems: It is often used as a preprocessing step to solve linear systems efficiently.</li>
  <li>Matrix Inversion: It can be used to compute the inverse of a matrix, especially when it's sparse or structured.</li>
  <li>Eigenvalue Computations: It can help with certain types of eigenvalue decomposition.</li>
</ul>
<h2>How LDU Factorization Works</h2>
<ol>
  <li>Step 1: Decompose the matrix 
𝐴
A into 
𝐿
L and 
𝑈
U using methods such as Gaussian elimination (without pivoting).</li>
  <li>Step 2: Extract the diagonal elements from the product of 
𝐿
L and 
𝑈
U to form the diagonal matrix 
𝐷
D</li>
  <li>Step 3: Adjust 
𝐿
L and 
𝑈
U so that the diagonal elements of 
𝐿
L become 1 (i.e., make 
𝐿
L a unit lower triangular matrix).</li>
</ol>
<h2>Applications of LDU Factorization</h2>
<ol>
  <li>Linear Equation Solvers: LDU can be used as a preconditioner for solving large systems of linear equations.</li>
  <li>Numerical Stability: The decomposition helps improve the numerical stability of certain matrix operations, particularly when dealing with ill-conditioned matrices.</li>
  <li>Optimization: In optimization problems, especially quadratic programming, LDU factorization can be a valuable tool for simplifying matrix operations.
</li>
</ol>
