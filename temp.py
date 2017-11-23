class A(object):
    def __init__(self):
        self.a = 1

    def __call__(self):
        return self.a


a = A()
print(a())