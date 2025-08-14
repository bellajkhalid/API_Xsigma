# Python Wrapper Core Classes

This directory provides the core support classes that are used by XSIGMA's
Python wrappers.  The classes can be split into two broad categories:
the *PyXSIGMA* classes provide C APIs for Python types, while the *xsigmaPython*
classes are C++ utility classes.

## The Python Classes

### PyXSIGMAObject

This defines APIs for creating and managing *PyXSIGMAClass* objects, which
are Python extension types that wrap xsigmaObjectBase-derived classes, and
*PyXSIGMAObject* objects, which are instances of the these extension types.

### PyXSIGMASpecialObject

Similarly, *PyXSIGMASpecialType* objects are Python extension types that
wrap C++ classes that are *not* derived from xsigmaObjectBase, and
*PyXSIGMASpecialObject* wraps the instances.  These object are reference
counted on the Python side, but not on the C++ side.  In general they
are lightweight objects that are cheap to copy.

### PyXSIGMATemplate

These objects represent C++ class templates.  The wrappers instantiate the
templates over a limited set of template parameters, and *PyXSIGMATemplate*
is a container for the template instantiations.  It is implemented as a
dictionary that maps template parameters to template instantiations.

### PyXSIGMAEnum

This provides an API for managing subtypes of the Python *int* type that
represent named C++ enum types.

### PyXSIGMANamespace

This provides an API for managing subtypes of the Python *module* type that
represent C++ namespaces.

### PyXSIGMAReference

Python does not support C++-style pass-by-reference, but pass-by-reference
can be simulated by passing a typed container whose contents can be modified.
The *PyXSIGMAReference* type defines such containers.  Within Python, this
type can be accessed as *xsigmamodules.xsigmaCommonCore.reference*.

### PyXSIGMAMethodDescriptor

In Python, a method descriptor is an object that customizes method lookup,
specifically it customizes *object.method* and *class.method* method access.
The *PyXSIGMAMethodDescriptor* customizes the access of *PyXSIGMAClass* methods.
It handles bound method calls, unbound method calls, static method calls,
and calls to overloaded methods.

### PyXSIGMAExtras

This one is not actually a class, it is a helper function that adds utility
methods and types like the previously-mentioned *reference* type to the
xsigmaCommonCore module.  Evertything in this file becomes part of xsigmaCommonCore.


## The C++ Classes

### xsigmaPythonUtil

This is a singleton that keeps track of all the xsigma-python extension modules
that have been loaded, and all of the xsigma-python objects that have been
instantiated.  It contains all of the machinery that is needed for moving
XSIGMA objects from C++ to Python and back again.

### xsigmaPythonCommand

This is a subclass of xsigmaCommand that allows Python methods to be used as
XSIGMA observer callbacks.

### xsigmaPythonArgs

When a method call is performed in the wrappers, xsigmaPythonArgs does the
conversion of the arguments from Python to C++, and it also converts the
return value from C++ to Python.

### xsigmaPythonOverload

When an overloaded method is called from Python, this class uses the method
arguments to decide which overload to use.

### xsigmaPythonCompatibility

This is actually just a header, not a class.  It contains macros that make
it easier to write code that is compatible with different versions of the
Python C API.

### xsigmaSmartPyObject

Whereas the other classes in this directory are for using XSIGMA C++ objects
through Python, this class is for using Python objects through C++.  This
class is a C++ smart pointer that handles Python reference counting.
