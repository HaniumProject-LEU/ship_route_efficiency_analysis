import numpy as np
from scipy.optimize import fmin_slsqp

class DEA(object):
    def __init__(self, x1, x2, x3, x4, x5, x6, x7, y1, y2):
        self.inputs = np.array([[x1, x2, x3, x4, x5, x6, x7]])
        self.outputs = np.array([[y1, y2]])

        self.n = self.inputs.shape[0]
        self.m = self.inputs.shape[1]
        self.r = self.outputs.shape[1]

        self.unit_ = range(self.n)
        self.input_ = range(self.m)
        self.output_ = range(self.r)

        self.output_w = np.zeros((self.r, 1), dtype=np.float)  
        self.input_w = np.zeros((self.m, 1), dtype=np.float) 
        self.lambdas = np.zeros((self.n, 1), dtype=np.float)  
        self.efficiency = np.zeros_like(self.lambdas) 
    def __efficiency(self, unit):
        denominator = np.dot(self.inputs, self.input_w)
        numerator = np.dot(self.outputs, self.output_w)

        return (numerator/denominator)[unit]
    def __target(self, x, unit):

        in_w, out_w, lambdas = x[:self.m], x[self.m:(self.m+self.r)], x[(self.m+self.r):] 
        denominator = np.dot(self.inputs[unit], in_w)
        numerator = np.dot(self.outputs[unit], out_w)

        return numerator/denominator

    def __constraints(self, x, unit):

        in_w, out_w, lambdas = x[:self.m], x[self.m:(self.m+self.r)], x[(self.m+self.r):] 
        constr = []  
        for input in self.input_:
            t = self.__target(x, unit)
            lhs = np.dot(self.inputs[:, input], lambdas)
            cons = t*self.inputs[unit, input] - lhs
            constr.append(cons)

        for output in self.output_:
            lhs = np.dot(self.outputs[:, output], lambdas)
            cons = lhs - self.outputs[unit, output]
            constr.append(cons)

        for u in self.unit_:
            constr.append(lambdas[u])

        return np.array(constr)

    def __optimize(self):
        d0 = self.m + self.r + self.n
        for unit in self.unit_:
            x0 = np.random.rand(d0) - 0.5
            x0 = fmin_slsqp(self.__target, x0, f_ieqcons=self.__constraints, args=(unit,),disp=False)
            self.input_w, self.output_w, self.lambdas = x0[:self.m], x0[self.m:(self.m+self.r)], x0[(self.m+self.r):]
            self.efficiency[unit] = self.__efficiency(unit)

    def fit(self):
        self.__optimize()  
        return self.efficiency

if __name__ == "__main__":
    x1, x2, x3, x4, x5, x6, x7 = 8, 2900, 3, 8, 2900, 3, 0
    y1, y2 = 4000, 50

    dea = DEA(x1, x2, x3, x4, x5, x6, x7, y1, y2)
    rs = dea.fit()
    for effi in rs:
        print(effi[0])