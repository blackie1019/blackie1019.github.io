#Parallel.ForEach vs PLINQ

##Foreach and LINQ

Language-Integrated Query (LINQ) is an innovation introduced in Visual Studio 2008 and .NET Framework version 3.5 that bridges the gap between the world of objects and the world of data.

##Parallel.ForEach

Use anonymous delegate, and runs multiple threads on this code in parallel for all the different items.

Parallel.ForEach是在enumberable data set以一個類似Foreach loop的方式在運作，但要再次強調它並非與foreach一樣，因為 Parallel.Foreach是有支援多執行緒的概念。

評估是否使用Parallel.Foreach的幾項參考:

1. Parallel.ForEach有numerous overloads



##PLINQ

##Foreach vs LINQ vs Parallel.Foreach vs PLINQ

幾個不常見的用法但比較常誤解的地方

- [Parallel.ForEach() vs. foreach(IEnumerable<T>.AsParallel())](http://stackoverflow.com/questions/3789998/parallel-foreach-vs-foreachienumerablet-asparallel)

##總結

##參考資料來源

- [Introduction to LINQ](http://msdn.microsoft.com/en-us/library/bb397897.aspx)